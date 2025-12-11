import { NextFunction, Request, Response } from "express";
import errorHandler from "../middleware/errorHandler";
import { AppDataSource } from "../database";
import { CardPart } from "../entites/CardPart";
import { Card } from "../entites/Card";
import { SparePart } from "../entites/SparePart";
import { log } from "console";
import { CustomRequest } from "../middleware/verifyToken";
import { CardProblem } from "../entites/CardProblem";
import { CardJob } from "../entites/CardJob";
import { CardWorkerJob } from "../entites/CardWorkerJob";
import { CardExpense } from "../entites/CardExpense";
import { User } from "../entites/User";
import { Between, In, LessThanOrEqual, MoreThanOrEqual } from "typeorm";

const cardParts = AppDataSource.getRepository(CardPart);
const cardRepository = AppDataSource.getRepository(Card);
const sparePartsRepository = AppDataSource.getRepository(SparePart);
const userRepository = AppDataSource.getRepository(User);
const cardJobRepo = AppDataSource.getRepository(CardJob);
const cardWorkerJobRepo = AppDataSource.getRepository(CardWorkerJob);
const cardProblemRepository = AppDataSource.getRepository(CardProblem);
const cardExpenseRespoisitory = AppDataSource.getRepository(CardExpense);

export const addToCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, selectedCount } = req.body;
    // console.log(id, selectedCount);

    const part = await sparePartsRepository.findOneBy({ id });

    if (!part) {
      next(errorHandler(401, "Məhsul anbarda mövcud deyil!"));
      return;
    }

    if (part.count > selectedCount) {
      part.count = part.count - selectedCount;
      await sparePartsRepository.save(part);

      const newcardPart = new CardPart();
      newcardPart.count = selectedCount;
      newcardPart.date = new Date();
      newcardPart.partName = part.name;
      newcardPart.soldPrice = part.sellPrice;
      await cardParts.save(newcardPart);
      res.status(201).json({ message: "Məhsul əlavə olundu" });
    } else {
    }
  } catch (error) {
    next(errorHandler(401, error));
  }
};

export const createCard = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const { cardData } = req.body;
    console.log(req.body);
    
    const userId = req.userId;

    // log(cardData);

    // =============================
    // 1) AV TOPLAMI
    // =============================
    const avSum = cardData.cardJobs.reduce(
      (sum: number, job: any) => sum + Number(job.av || 0), //bu duzdur
      0
    );

    // =============================
    // 2) WORKER-ID-LƏRİ YIĞIRIQ
    // =============================
    const workerIds = cardData.cardJobs.flatMap((j: any) =>
      j.workers.map((jw: any) => Number(jw.workerId))
    );

    const uniqueWorkerIds = [...new Set(workerIds)];

    // İŞÇİ FAİZLƏRİNİ GƏTİRİRİK
    const workers = await userRepository.find({
      where: { id: In(uniqueWorkerIds) },
    });

    const workerMap = new Map();
    workers.forEach((w) => workerMap.set(w.id, w.percent));

    // =============================
    // 3) ÜMUMİ ENDİRİMLİ MƏBLƏĞ HESABLANMASI
    // =============================

    const workSum = cardData.cardJobs.reduce((sum: number, j: any) => {
      const av = Number(j.av || 0);
      const globalDiscount = Number(j.discount || 0);
      const price = av * 50 * (1 - globalDiscount / 100);
      return sum + price;
    }, 0);

    const workSumOwn = cardData.cardJobs.reduce((sum: number, j: any) => {
      const av = Number(j.av || 0);
      const globalDiscount = Number(j.discount || 0);
      // const price = av * 50 * (1 - globalDiscount / 100);
      let workerTotalSumOwn = 0;
      for (const jw of j.workers) {
        const avWorker = Number(jw.workerAv || 0);
        const workerId = Number(jw.workerId);
        const workerPercent = workerMap.get(workerId) || 0;

        const price =
          50 * avWorker * (1 - globalDiscount / 100) * (workerPercent / 100);
        // ⭐ DÜZGÜN MAAS DÜSTURU
        workerTotalSumOwn += price;
      }
      return sum + workerTotalSumOwn;
    }, 0);

    // =============================
    // 4) CARD CREATE
    // =============================
    const newCard = new Card();
    newCard.clientId = Number(cardData.clientId);
    newCard.type = cardData.type;
    newCard.manufactured = cardData.manufactured;
    newCard.model = cardData.model;
    newCard.sassi = cardData.sassi;
    newCard.carNumber = cardData.carNumber;
    newCard.produceDate = cardData.produceDate;
    newCard.km = cardData.km;
    newCard.qostNumber = cardData.qostNumber;
    newCard.paymentType = cardData.paymentType;
    newCard.nds = cardData.nds;
    newCard.repairAgain = cardData.repairAgain;
    newCard.servisInfo = cardData.servisInfo;
    newCard.comments = cardData.comments;
    newCard.recommendation = cardData.recommendation;
    newCard.workSum = workSum;
    newCard.workSumOwn = workSumOwn;
    newCard.avSum = avSum;
    newCard.openDate = new Date();
    newCard.userId = userId;

    const savedCard = await cardRepository.save(newCard);

    // =============================
    // 5) PROBLEMLƏR (CardProblem)
    // =============================
    if (Array.isArray(cardData.cardProblems)) {
      for (const p of cardData.cardProblems) {
        const prob = new CardProblem();
        prob.description = p.description;
        prob.cardId = savedCard.id;

        const savedProblem = await cardProblemRepository.save(prob);

        if (Array.isArray(p.serviceWorkers)) {
          for (const workerId of p.serviceWorkers) {
            await cardProblemRepository.manager
              .createQueryBuilder()
              .relation(CardProblem, "serviceWorkers")
              .of(savedProblem.id) // <-- Burda .id vermək daha doğrudur
              .add(workerId);
          }
        }
      }
    }

    // =============================
    // 6) JOBLAR + WORKERJOB + WORKER SALARY
    // =============================
    if (Array.isArray(cardData.cardJobs)) {
      for (const j of cardData.cardJobs) {
        const av = Number(j.av || 0);
        const discount = Number(j.discount || 0);

        const price = av * 50 * (1 - discount / 100);

        const newJob = new CardJob();
        newJob.code = j.code;
        newJob.name = j.name;
        newJob.av = av;
        newJob.price = price;
        newJob.discount = discount;
        newJob.oil = j.oil;
        newJob.cardId = savedCard.id;

        const savedJob = await cardJobRepo.save(newJob);

        // ==============================
        // İşçilər
        // ==============================
        if (Array.isArray(j.workers)) {
          for (const jw of j.workers) {
            const workerId = Number(jw.workerId);
            const user = await userRepository.findOneBy({ id: workerId });

            if (!user) {
              next(errorHandler(404, "İşçi tapılmadı"));
              return;
            }

            // WorkerJob CREATE
            const wj = new CardWorkerJob();
            wj.workerAv = Number(jw.workerAv);
            wj.user = user;
            wj.cardJobId = savedJob.id;
            wj.salaryPercent = user.percent;
            wj.date = new Date();

            // ⭐ DÜZGÜN MAAS DÜSTURU
            wj.earnedSalary =
              Number(jw.workerAv) *
              50 *
              (1 - discount / 100) *
              (user.percent / 100);

            await cardWorkerJobRepo.save(wj);
          }
        }
      }
    }

    // =============================
    // 7) XƏRCLƏR
    // =============================
    if (Array.isArray(cardData.expences)) {
      for (const e of cardData.expences) {
        const exp = new CardExpense();
        exp.description = e.description;
        exp.price = Number(e.price);
        exp.cardId = savedCard.id;

        await cardExpenseRespoisitory.save(exp);
      }
    }

    res.status(201).json({
      message: "Kart yaradıldı",
      card: savedCard,
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, error));
  } finally {
    await queryRunner.release();
  }
};

export const filterCards = async (req: Request, res: Response) => {
  try {
    const filters = req.body.filters || {};

    // console.log({ filters });

    const query = AppDataSource.getRepository(Card)
      .createQueryBuilder("card")
      .leftJoinAndSelect("card.client", "client")
      .leftJoinAndSelect("card.user", "user")
      .leftJoinAndSelect("card.cardJobs", "cardJobs")
      .leftJoinAndSelect("card.cardParts", "cardParts")
      .leftJoinAndSelect("card.cardProblems", "cardProblems")
      .leftJoinAndSelect("card.expenses", "cardExpenses");

    if (
      filters.startDate &&
      filters.startDate.trim() !== "" &&
      filters.endDate &&
      filters.endDate.trim() !== ""
    ) {
      // Hər iki tarix varsa → BETWEEN
      query.andWhere("card.open_date BETWEEN :start AND :end", {
        start: filters.startDate.trim(),
        end: filters.endDate.trim(),
      });
    } else if (filters.startDate && filters.startDate.trim() !== "") {
      // Yalnız start varsa
      query.andWhere("card.open_date >= :start", {
        start: filters.startDate.trim(),
      });
    } else if (filters.endDate && filters.endDate.trim() !== "") {
      // Yalnız end varsa
      query.andWhere("card.open_date <= :end", {
        end: filters.endDate.trim(),
      });
    }

    // Other filters
    if (filters.cardNumber) {
      query.andWhere("card.id = :cardNumber", {
        cardNumber: filters.cardNumber,
      });
    }

    if (filters.cardStatus && filters.cardStatus !== "all") {
      const isOpen = filters.cardStatus === "open";
      query.andWhere("card.is_open = :isOpen", { isOpen });
    }
    if (filters.banNumber && filters.banNumber.trim() !== "") {
      query.andWhere("card.qostNumber = :banNumber", {
        banNumber: filters.banNumber.trim(),
      });
    }
    if (filters.paymentType) {
      query.andWhere("card.paymentType = :paymentType", {
        paymentType: filters.paymentType,
      });
    }
    if (filters.clientId) {
      query.andWhere("client.id = :clientId", { clientId: filters.clientId });
    }
    if (filters.manufactured) {
      query.andWhere("card.manufactured = :manufactured", {
        manufactured: filters.manufactured,
      });
    }
    if (filters.receptionId) {
      query.andWhere("card.user_id = :receptionId", {
        receptionId: filters.receptionId,
      });
    }

    if (filters.legalOrPhysical) {
      query.andWhere("client.type_of_status = :legalOrPhysical", {
        legalOrPhysical: filters.legalOrPhysical,
      });
    }

    if (filters.customerType) {
      query.andWhere("client.type = :customerType", {
        customerType: filters.customerType,
      });
    }

    if (filters.carNumber && filters.carNumber.trim() !== "") {
      query.andWhere("card.car_number = :carNumber", {
        carNumber: filters.carNumber.trim(),
      });
    }
    // if (filters.minAmount) {
    //   query.andWhere('card.amount >= :minAmount', { minAmount: filters.minAmount });
    // }
    // if (filters.maxAmount) {
    //   query.andWhere('card.amount <= :maxAmount', { maxAmount: filters.maxAmount });
    // }

    const cards = await query.getMany(); // fetch results with joined client and user

    // log(cards);

    res.json(cards);
  } catch (error) {
    console.error("FilterCards error:", error);
    res.status(500).json({ message: "Error filtering cards." });
  }
};

export const getCardDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cardId = Number(req.params.id);

    const card = await AppDataSource.getRepository(Card)
      .createQueryBuilder("card")
      .leftJoinAndSelect("card.client", "client")
      .leftJoinAndSelect("card.user", "user")
      .addSelect([
        "user.id",
        "user.userName",
        "user.firstName",
        "user.lastName",
      ]) // password gəlməyəcək
      .leftJoinAndSelect("card.cardJobs", "cardJobs")
      .leftJoinAndSelect("cardJobs.workers", "jobWorkers") // CardWorkerJob-lar
      .addSelect([
        "jobWorkers.id",
        "jobWorkers.workerAv",
        "jobWorkers.salaryPercent",
        "jobWorkers.earnedSalary",
        "jobWorkers.date",
      ])
      .leftJoinAndSelect("jobWorkers.user", "workerUser")
      .addSelect([
        "workerUser.id",
        "workerUser.userName",
        "workerUser.firstName",
        "workerUser.lastName",
      ])
      .leftJoinAndSelect("card.cardProblems", "cardProblems")
      .leftJoinAndSelect("cardProblems.serviceWorkers", "serviceWorkers")
      .addSelect([
        "serviceWorkers.id",
        "serviceWorkers.userName",
        "serviceWorkers.firstName",
        "serviceWorkers.lastName",
      ])
      .leftJoinAndSelect("card.expenses", "cardExpenses")
      .where("card.id = :id", { id: cardId })
      .getOne();

    if (!card) {
      next(errorHandler(404, "Kart tapılmadı"));
      return;
    }

    // log(card);
    res.status(201).json(card);
  } catch (error) {
    next(errorHandler(500, error));
  }
};

export const updateCard = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const cardId = Number(req.params.id);
    const { cardData } = req.body;
    const userId = req.userId;

    // 1️⃣ Mövcud kartı tap
    const existingCard = await cardRepository.findOneBy({ id: cardId });
    if (!existingCard) {
      return next(errorHandler(404, "Kart tapılmadı"));
    }

    // 2️⃣ Kartın əsas sahələrini update et
    existingCard.clientId = Number(cardData.clientId);
    existingCard.type = cardData.type;
    existingCard.manufactured = cardData.manufactured;
    existingCard.model = cardData.model;
    existingCard.sassi = cardData.sassi;
    existingCard.carNumber = cardData.carNumber;
    existingCard.produceDate = cardData.produceDate;
    existingCard.km = cardData.km;
    existingCard.qostNumber = cardData.qostNumber;
    existingCard.paymentType = cardData.paymentType;
    existingCard.nds = cardData.nds;
    existingCard.repairAgain = cardData.repairAgain;
    existingCard.servisInfo = cardData.servisInfo;
    existingCard.comments = cardData.comments;
    existingCard.recommendation = cardData.recommendation;

    const updatedCard = await cardRepository.save(existingCard);

    // 3️⃣ Mövcud cardProblems, cardJobs, jobWorkers, expences sil
    await queryRunner.manager.delete(CardProblem, { cardId });

    const existingJobs = await cardJobRepo.find({ where: { cardId } });
    const existingJobIds = existingJobs.map((j) => j.id);

    if (existingJobIds.length > 0) {
      await queryRunner.manager.delete(CardWorkerJob, {
        cardJobId: In(existingJobIds),
      });
    }

    await queryRunner.manager.delete(CardJob, { cardId });
    await queryRunner.manager.delete(CardExpense, { cardId });

    // 4️⃣ Yeni cardProblems əlavə et
    if (Array.isArray(cardData.cardProblems)) {
      for (const p of cardData.cardProblems) {
        const newProblem = new CardProblem();
        newProblem.description = p.description;
        newProblem.cardId = cardId;

        const savedProblem = await cardProblemRepository.save(newProblem);

        if (Array.isArray(p.serviceWorkers)) {
          for (const workerId of p.serviceWorkers) {
            await queryRunner.manager
              .createQueryBuilder()
              .relation(CardProblem, "serviceWorkers")
              .of(savedProblem.id)
              .add(workerId);
          }
        }
      }
    }

    // 5️⃣ Yeni cardJobs və jobWorkers əlavə et
    if (Array.isArray(cardData.cardJobs)) {
      // İşçilərin faizi üçün map
      const workerIds = cardData.cardJobs.flatMap((j: any) =>
        j.workers.map((w: any) => Number(w.workerId))
      );
      const uniqueWorkerIds = [...new Set(workerIds)];
      const workers = await userRepository.find({
        where: { id: In(uniqueWorkerIds) },
      });
      const workerMap = new Map();
      workers.forEach((w) => workerMap.set(w.id, w.percent));

      for (const j of cardData.cardJobs) {
        const av = Number(j.av || 0);
        const discount = Number(j.discount || 0);
        const price = av * 50 * (1 - discount / 100);

        const newJob = queryRunner.manager.create(CardJob, {
          code: j.code,
          name: j.name,
          av,
          price,
          discount,
          oil: j.oil,
          cardId,
        });

        const savedJob = await queryRunner.manager.save(newJob);

        if (Array.isArray(j.workers)) {
          for (const jw of j.workers) {
            const workerId = Number(jw.workerId);
            const user = workers.find((w) => w.id === workerId);

            if (!user) continue;

            const newCardWorkerJob = new CardWorkerJob();
            newCardWorkerJob.workerAv = Number(jw.workerAv);
            newCardWorkerJob.user = user;
            newCardWorkerJob.cardJobId = savedJob.id;
            newCardWorkerJob.salaryPercent = user.percent;
            newCardWorkerJob.earnedSalary =
              Number(jw.workerAv) *
              50 *
              (1 - discount / 100) *
              (user.percent / 100);
            newCardWorkerJob.date = new Date();

            await cardWorkerJobRepo.save(newCardWorkerJob);
          }
        }
      }
    }

    // 6️⃣ Xərcləri əlavə et
    if (Array.isArray(cardData.expences)) {
      for (const e of cardData.expences) {
        const newCardExpense = new CardExpense();
        newCardExpense.description = e.description;
        newCardExpense.price = Number(e.price);
        newCardExpense.cardId = cardId;

        await cardExpenseRespoisitory.save(newCardExpense);
      }
    }

    res.status(200).json({
      message: "Kart yeniləndi",
      card: updatedCard,
    });
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.log(error);
    next(errorHandler(500, error));
  } finally {
    await queryRunner.release();
  }
};
