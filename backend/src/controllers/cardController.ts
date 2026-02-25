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
import { In } from "typeorm";
import { Account } from "../entites/Account";
import { Repair } from "../entites/Repair";
import { AccountSequence } from "../entites/AccountSequence";
import { RepairSequence } from "../entites/RepairSequence";
import { JobList } from "../entites/JobList";

const cardPartsRepository = AppDataSource.getRepository(CardPart);
const cardRepository = AppDataSource.getRepository(Card);
const sparePartsRepository = AppDataSource.getRepository(SparePart);
const userRepository = AppDataSource.getRepository(User);
const cardJobRepo = AppDataSource.getRepository(CardJob);
const cardWorkerJobRepo = AppDataSource.getRepository(CardWorkerJob);
const cardProblemRepository = AppDataSource.getRepository(CardProblem);
const cardExpenseRespoisitory = AppDataSource.getRepository(CardExpense);
const accountRepository = AppDataSource.getRepository(Account);
const repairRepository = AppDataSource.getRepository(Repair);
const accountSequenceRepository = AppDataSource.getRepository(AccountSequence);
const repairSequenceRepository = AppDataSource.getRepository(RepairSequence);
const jobListRepository = AppDataSource.getRepository(JobList);

export const addToCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cardId, id, selectedCount } = req.body;

    // console.log(cardId, id, selectedCount);

    const part = await sparePartsRepository.findOneBy({ id: id });
    const card = await cardRepository.findOne({
      where: { id: +cardId },
      relations: ["client"],
    });

    if (!card) {
      return next(errorHandler(404, "Kart mövcud deyil"));
    }

    if (!part) {
      return next(errorHandler(404, "Məhsul anbarda mövcud deyil!"));
    }

    if (selectedCount > part.count) {
      return next(errorHandler(400, "Seçilən say anbardakı saydan çoxdur!"));
    }

    // CardPart yarat
    const newCardPart = new CardPart();
    newCardPart.card = card;
    newCardPart.count = selectedCount;
    newCardPart.date = new Date();
    newCardPart.partName = part.name;
    newCardPart.soldPrice = part.sellPrice;
    newCardPart.usedPrice =
      card.paymentType === "internal" || card.paymentType === "warranty"
        ? part.price
        : part.sellPrice;
    newCardPart.discount =
      card.paymentType === "cash" ||
      card.paymentType === "transfer" ||
      card.paymentType === "pos"
        ? card.client.partsDiscount
        : 0;
    newCardPart.netPrice = part.price;
    newCardPart.code = part.code;
    newCardPart.sparePart = part;

    await cardPartsRepository.save(newCardPart);

    // Anbardakı sayı yenilə və ya sil

    part.count -= selectedCount;
    await sparePartsRepository.save(part);

    // console.log("buracan gelir");

    const existingCard = await cardRepository.findOne({
      where: { id: cardId },
      relations: ["cardParts"],
    });

    if (!existingCard) {
      return next(errorHandler(400, "Kart mövcud deyil"));
    }

    const totalSell = existingCard?.cardParts?.reduce(
      (sum: any, p: any) => sum + p.soldPrice * p.count * (1 - p.discount),
      0,
    );
    const totalPartsOwnPrice = existingCard?.cardParts?.reduce(
      (sum: any, p: any) => sum + p.netPrice * p.count,
      0,
    );

    existingCard.partsTotalPrice = totalSell;
    existingCard.partsSumOwn = totalPartsOwnPrice;

    await cardRepository.save(existingCard);

    res
      .status(201)
      .json({ success: true, message: "Məhsul karta əlavə olundu" });
  } catch (error) {
    next(errorHandler(500, error));
  }
};

export const createCard = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const { cardData } = req.body;
    const userId = req.userId;

    log(cardData);

    /* ============================
       0️⃣ SAFE DEFAULT ARRAYS
    ============================ */
    const cardJobs = Array.isArray(cardData.cardJobs) ? cardData.cardJobs : [];

    const cardProblems = Array.isArray(cardData.cardProblems)
      ? cardData.cardProblems
      : [];

    const expences = Array.isArray(cardData.expences) ? cardData.expences : [];

    /* ============================
       1️⃣ AV SUM
    ============================ */
    const avSum = cardJobs.reduce(
      (sum: number, j: any) => sum + Number(j.av || 0),
      0,
    );

    /* ============================
       2️⃣ WORKER MAP
    ============================ */
    const workerIds = cardJobs.flatMap((j: any) =>
      Array.isArray(j.workers)
        ? j.workers.map((w: any) => Number(w.workerId))
        : [],
    );

    const uniqueWorkerIds = [...new Set(workerIds)].filter(Boolean);

    const workers =
      uniqueWorkerIds.length > 0
        ? await userRepository.find({
            where: { id: In(uniqueWorkerIds) },
          })
        : [];

    const workerMap = new Map<number, number>();
    workers.forEach((w) => workerMap.set(w.id, Number(w.percent || 0)));

    /* ============================
       3️⃣ WORK SUMS
    ============================ */
    let workSum = 0;
    let workSumOwn = 0;

    if (cardJobs.length > 0) {
      for (const j of cardJobs) {
        const av = Number(j.av || 0);
        const discount = Number(j.discount || 0);

        // NORMAL PAYMENT
        if (cardData.paymentType !== "internal") {
          workSum += av * 50 * (1 - discount / 100);
          for (const jw of j.workers) {
            const workerAv = Number(jw.workerAv || 0);
            const workerPercent = workerMap.get(Number(jw.workerId)) || 0;

            const salary = workerAv * 50 * (workerPercent / 100);
            // workSum += salary * (1 - discount / 100);
            workSumOwn += salary;
          }
        }

        // INTERNAL PAYMENT
        if (cardData.paymentType === "internal" && Array.isArray(j.workers)) {
          for (const jw of j.workers) {
            const workerAv = Number(jw.workerAv || 0);
            const workerPercent = workerMap.get(Number(jw.workerId)) || 0;

            const salary = workerAv * 50 * (workerPercent / 100);
            workSum += salary * (1 - discount / 100);
            workSumOwn += salary;
          }
        }
      }
    }

    /* ============================
       4️⃣ CREATE CARD (ONLY CORE DATA)
    ============================ */
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
    newCard.isWayOut = cardData.isWayOut;
    newCard.wayOutDirection = cardData.wayOutDirection;
    newCard.wayOutWorkers = cardData.wayOutWorkers;
    newCard.wayOutCar = cardData.wayOutCar;
    newCard.wayOutDistance = cardData.wayOutDistance;
    newCard.wayOutWorkTime = cardData.wayOutWorkTime;
    newCard.workSum = workSum;
    newCard.workSumOwn = workSumOwn;
    newCard.avSum = avSum;
    newCard.openDate = new Date();
    newCard.isOpen = true;
    newCard.userId = userId;

    const savedCard = await cardRepository.save(newCard);

    /* ============================
       5️⃣ CARD PROBLEMS (OPTIONAL)
    ============================ */
    for (const p of cardProblems) {
      const problem = new CardProblem();
      problem.description = p.description;
      problem.cardId = savedCard.id;

      const savedProblem = await cardProblemRepository.save(problem);

      if (Array.isArray(p.serviceWorkers)) {
        for (let workerId of p.serviceWorkers) {
          if (!Number.isFinite(workerId)) continue;

          await cardProblemRepository.manager
            .createQueryBuilder()
            .relation(CardProblem, "serviceWorkers")
            .of(savedProblem.id)
            .add(workerId);
        }
      }
    }

    /* ============================
       6️⃣ JOBS (OPTIONAL)
    ============================ */
    for (const j of cardJobs) {
      const av = Number(j.av || 0);
      const discount = Number(j.discount || 0);
      let jobDiscountPrice = 0;

      const job = new CardJob();
      job.code = j.code;
      job.name = j.name;
      job.av = av;
      job.discount = discount;
      job.oil = j.code === "Y1" ? 33.3 : 0;
      job.cardId = savedCard.id;
      job.price = j.price;

      const savedJob = await cardJobRepo.save(job);

      if (Array.isArray(j.workers)) {
        for (const jw of j.workers) {
          const user = await userRepository.findOneBy({
            id: Number(jw.workerId),
          });
          if (!user) continue;

          const workerAv = Number(jw.workerAv || 0);
          const percent = Number(user.percent || 0);

          const earnedSalary =
            jw.code === "Y1" ? 33.3 * 0.3 : workerAv * 50 * (percent / 100);

          if (cardData.paymentType === "internal") {
            jobDiscountPrice += earnedSalary;
          }

          const wj = new CardWorkerJob();
          wj.workerAv = workerAv;
          wj.user = user;
          wj.cardJobId = savedJob.id;
          wj.salaryPercent = percent;
          wj.earnedSalary = earnedSalary;
          wj.date = new Date();

          await cardWorkerJobRepo.save(wj);
        }
      }

      // if (cardData.paymentType !== "internal") {
      //   jobDiscountPrice = av * 50;
      // }

      jobDiscountPrice = j.price * (1 - discount / 100);
      savedJob.discountPrice = Number(jobDiscountPrice.toFixed(2));
      await cardJobRepo.save(savedJob);
    }

    /* ============================
       7️⃣ EXPENCES (OPTIONAL)
    ============================ */
    for (const e of expences) {
      const exp = new CardExpense();
      exp.description = e.description;
      exp.price = Number(e.price || 0);
      exp.card = savedCard;

      await cardExpenseRespoisitory.save(exp);
    }

    await queryRunner.commitTransaction();

    res.status(201).json({
      success: true,
      message: "Kart uğurla yaradıldı",
      cardId: savedCard.id,
    });
  } catch (error) {
    await queryRunner.rollbackTransaction();
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
      .leftJoinAndSelect("card.closedByUser", "closedByUser")
      .leftJoinAndSelect("card.cardJobs", "cardJobs")
      .leftJoinAndSelect("cardJobs.workers", "jobWorkers")
      .leftJoinAndSelect("jobWorkers.user", "workerUser")
      .leftJoinAndSelect("card.cardParts", "cardParts")
      .leftJoinAndSelect("card.cardProblems", "cardProblems")
      .leftJoinAndSelect("cardProblems.serviceWorkers", "serviceWorkers")
      .leftJoinAndSelect("card.expenses", "cardExpenses")
      .leftJoinAndSelect("card.account", "account") // ✅
      .leftJoinAndSelect("card.repair", "repair"); // ✅

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
  next: NextFunction,
) => {
  try {
    const cardId = Number(req.params.id);

    // console.log(cardId);

    const card = await cardRepository.findOne({
      where: { id: cardId },
      relations: [
        "client",
        "user",
        "closedByUser",
        "cardJobs",
        "cardJobs.workers",
        "cardJobs.workers.user",
        "cardProblems",
        "cardProblems.serviceWorkers",
        "expenses",
        "cardParts",
        "repair",
        "account",
        // <- artıq burada var
      ],
    });

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
  next: NextFunction,
) => {
  try {
    const cardId = Number(req.params.id);
    const { cardData } = req.body;
    const userId = req.userId;
    console.log(cardData, cardId);

    // 1) AV TOPLAMI
    // =============================
    const avSum = cardData.cardJobs.reduce(
      (sum: number, job: any) => sum + Number(job.av || 0), //bu duzdur
      0,
    );

    // =============================
    // 2) WORKER-ID-LƏRİ YIĞIRIQ
    // =============================
    const workerIds = cardData.cardJobs.flatMap((j: any) =>
      j.workers.map((jw: any) => Number(jw.workerId)),
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
      const discount = Number(j.discount || 0);

      // let price = 0;

      // // 🔥 INTERNAL → yalnız işçi maaşı
      // if (cardData.paymentType === "internal") {
      //   for (const jw of j.workers || []) {
      //     const avWorker = Number(jw.workerAv || 0);
      //     const workerId = Number(jw.workerId);
      //     const workerPercent = workerMap.get(workerId) || 0;

      //     price += avWorker * 50 * (workerPercent / 100);
      //   }
      // }
      // // 🔹 EXTERNAL → av * 50
      // else {
      //   price = av * 50;
      // }

      // ✅ Y1 də daxil olmaqla hamısına discount
      return sum + j.price * (1 - discount / 100);
    }, 0);

    const workSumOwn = cardData.cardJobs.reduce((sum: number, j: any) => {
      // ❌ Y1 maya dəyərinə düşmür
      // if (j.code === "Y1") return sum;

      let workerTotal = 0;

      for (const jw of j.workers || []) {
        const avWorker = j.code === "Y1" ? 0 : Number(jw.workerAv || 0);
        const workerId = Number(jw.workerId);
        const workerPercent = workerMap.get(workerId) || 0;

        workerTotal += avWorker * 50 * (workerPercent / 100);
      }

      return sum + workerTotal;
    }, 0);

    let partsTotalPrice = 0;
    let partsSumOwn = 0;

    if (Array.isArray(cardData.cardParts) && cardData.cardParts.length > 0) {
      partsTotalPrice = cardData.cardParts.reduce((sum: number, part: any) => {
        if (cardData.paymentType === "internal") {
          return (
            sum + part.netPrice * part.count * (1 - (part.discount || 0) / 100)
          );
        } else {
          return (
            sum + part.soldPrice * part.count * (1 - (part.discount || 0) / 100)
          );
        }
      }, 0);

      partsSumOwn = cardData.cardParts.reduce((sum: number, part: any) => {
        return sum + part.netPrice * part.count;
      }, 0);
    }

    // 1️⃣ Mövcud kartı tap
    const existingCard = await cardRepository.findOneBy({ id: cardId });
    if (!existingCard) {
      return next(errorHandler(404, "Kart tapılmadı"));
    }

    // 2️⃣ Kartın əsas sahələrini update et
    existingCard.clientId = Number(cardData.clientId);
    existingCard.type = cardData.type;
    existingCard.avSum = avSum;
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
    existingCard.workSum = workSum;
    existingCard.workSumOwn = workSumOwn;
    existingCard.isWayOut = cardData.isWayOut;
    existingCard.wayOutDirection = cardData.wayOutDirection;
    existingCard.wayOutWorkers = cardData.wayOutWorkers;
    existingCard.wayOutCar = cardData.wayOutCar;
    existingCard.wayOutDistance = cardData.wayOutDistance;
    existingCard.wayOutWorkTime = cardData.wayOutWorkTime;
    existingCard.partsTotalPrice = partsTotalPrice;
    existingCard.partsSumOwn = partsSumOwn;
    await cardRepository.save(existingCard);

    // ==========================
    // 2️⃣ Join table əlaqələrini sil
    // ==========================
    // ==========================
    // 1️⃣ Köhnə problemləri götür
    // ==========================
    const oldProblems = await cardProblemRepository.find({
      where: { cardId },
      relations: ["serviceWorkers"],
    });

    // ==========================
    // 2️⃣ Köhnə worker relation-ları sil
    // ==========================
    for (const problem of oldProblems) {
      if (problem.serviceWorkers?.length) {
        await cardProblemRepository
          .createQueryBuilder()
          .relation(CardProblem, "serviceWorkers")
          .of(problem.id)
          .remove(problem.serviceWorkers.map((w) => w.id));
      }
    }

    // ==========================
    // 3️⃣ Köhnə CardProblem-ləri sil
    // ==========================
    await cardProblemRepository.delete({ cardId });

    // ==========================
    // 4️⃣ Yeni CardProblem-ləri yarat
    // ==========================
    if (Array.isArray(cardData.cardProblems)) {
      for (const p of cardData.cardProblems) {
        const problem = cardProblemRepository.create({
          description: p.description,
          cardId: cardId,
        });

        const savedProblem = await cardProblemRepository.save(problem);

        // ==========================
        // 5️⃣ Service workers əlavə et
        // ==========================
        if (Array.isArray(p.serviceWorkers)) {
          const workerIds = [
            ...new Set(
              p.serviceWorkers
                .map(Number)
                .filter((id: any) => Number.isInteger(id) && id > 0),
            ),
          ];

          if (workerIds.length > 0) {
            await cardProblemRepository
              .createQueryBuilder()
              .relation(CardProblem, "serviceWorkers")
              .of(savedProblem.id)
              .add(workerIds);
          }
        }
      }
    }

    // ==========================
    // 1️⃣ Köhnə CardJob-ları tap
    // ==========================
    const oldJobs = await cardJobRepo.find({
      where: { cardId },
    });

    // Köhnə job id-lər
    const oldJobIds = oldJobs.map((j) => j.id);

    // ==========================
    // 2️⃣ CardWorkerJob-ları sil
    // ==========================
    if (oldJobIds.length > 0) {
      await cardWorkerJobRepo.delete({
        cardJobId: In(oldJobIds),
      });
    }

    // ==========================
    // 3️⃣ CardJob-ları sil
    // ==========================
    await cardJobRepo.delete({ cardId });

    // ==========================
    // 4️⃣ Yeni CardJob-ları yarat
    // ==========================
    for (const j of cardData.cardJobs) {
      const av = Number(j.av || 0);
      const discount = Number(j.discount || 0);

      let jobDisCountPrice = 0;

      // 🔥 INTERNAL PAYMENT
      if (cardData.paymentType === "internal") {
        for (const jw of j.workers || []) {
          const workerId = Number(jw.workerId);
          const workerAv = Number(jw.workerAv || 0);

          const workerPercent = workerMap.get(workerId) || 0;

          jobDisCountPrice += workerAv * 50 * (workerPercent / 100);
        }

        // discount sonda
        jobDisCountPrice = jobDisCountPrice * (1 - discount / 100);
      }
      // 🔹 EXTERNAL / NORMAL
      else {
        jobDisCountPrice = av * 50 * (1 - discount / 100);
      }

      const newJob = cardJobRepo.create({
        code: j.code,
        name: j.name,
        av,
        discount,
        oil: j.code === "Y1" ? 33.3 : 0,
        price: j.price,
        discountPrice: Number(j.price) * (1 - discount / 100),
        cardId,
      });

      const savedJob = await cardJobRepo.save(newJob);

      // ==========================
      // İşçilər (salary HƏMİŞƏ EYNİ)
      // ==========================
      if (Array.isArray(j.workers)) {
        for (const jw of j.workers) {
          const worker = await userRepository.findOneBy({
            id: Number(jw.workerId),
          });
          if (!worker) continue;

          const workerAv = Number(jw.workerAv || 0);

          const earnedSalary =
            j.code === "Y1"
              ? 33.3 * 0.3
              : workerAv * 50 * (worker.percent / 100);

          const newWorkerJob = new CardWorkerJob();
          newWorkerJob.cardJobId = savedJob.id;
          newWorkerJob.workerAv = workerAv;
          newWorkerJob.workerId = worker.id;
          newWorkerJob.salaryPercent = worker.percent ?? 0;
          newWorkerJob.earnedSalary = earnedSalary;
          newWorkerJob.date = new Date();

          await cardWorkerJobRepo.save(newWorkerJob);
        }
      }
    }

    // 1️⃣ Köhnə expenses-ləri götür və sil
    await cardExpenseRespoisitory.delete({
      card: { id: cardId },
    });

    // 2️⃣ Yeni expenses əlavə et
    if (Array.isArray(cardData.expences)) {
      for (const e of cardData.expences) {
        const newExp = new CardExpense();
        newExp.description = e.description;
        newExp.price = Number(e.price);
        newExp.card = existingCard;

        await cardExpenseRespoisitory.save(newExp);
      }
    }

    //Yeni ehtiyyat hisselerini silinir və yenileri elave edilir

    await cardPartsRepository.delete({
      card: { id: cardId },
    });
    // ==========================
    // 2️⃣ Yeni cardParts əlavə et
    // ==========================
    if (Array.isArray(cardData.cardParts)) {
      for (const p of cardData.cardParts) {
        const newPart = new CardPart();

        newPart.card = existingCard;
        newPart.partName = p.partName;
        newPart.code = p.code;
        newPart.count = Number(p.count);
        newPart.soldPrice = Number(p.soldPrice);
        newPart.discount =
          cardData.paymentType === "internal" ? 0 : Number(p.discount || 0);
        newPart.netPrice = Number(p.netPrice);
        newPart.date = p.date ? new Date(p.date) : new Date();

        if (p.sparePart?.id) {
          newPart.sparePart = await sparePartsRepository.findOneBy({
            id: p.sparePart.id,
          });
        }

        await cardPartsRepository.save(newPart);
      }
    }


    res.status(200).json({
      message: "Kart yeniləndi",
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, error));
  }
};

export const returnPart = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cardId, partId } = req.body;
    const userId = req.userId;
    // 1️⃣ Mövcud kartı tap
    const existingCard = await cardRepository.findOneBy({ id: cardId });
    if (!existingCard) {
      return next(errorHandler(404, "Kart tapılmadı"));
    }
    const part = await cardPartsRepository.findOneBy({ id: partId });
    if (!part) {
      return next(errorHandler(404, "Ehtiyyat hissəsi tapılmadı"));
    }
    // Anbara qaytar
    const sparePart = await sparePartsRepository.findOneBy({
      id: part.sparePart.id,
    });
    if (!sparePart) {
      return next(errorHandler(404, "Ehtiyyat hissəsi anbarda tapılmadı"));
    }
    sparePart.count += part.count;
    await sparePartsRepository.save(sparePart);
    // Kartdan sil
    await cardPartsRepository.delete({ id: partId });
    res.status(200).json({
      success: true,
      message: "Ehtiyyat hissəsi anbara qaytarıldı və kartdan silindi",
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, error));
  }
};

export const createAccountForCard = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cardId } = req.body;

    const card = await cardRepository.findOneBy({ id: cardId });
    if (!card) {
      return next(errorHandler(404, "Kart tapılmadı"));
    }

    // 1️⃣ Card üçün account varmı?
    let account = await accountRepository.findOne({
      where: { card: { id: cardId } },
      relations: ["card"],
    });

    // 2️⃣ Account VAR və doludursa → STOP
    if (
      account &&
      account.accountID !== null &&
      account.accountID !== undefined &&
      account.accountID !== 0
    ) {
      return res.status(200).json({
        isExist: true,
        message: "Bu kart üçün artıq hesab aktı mövcuddur",
        account,
      });
    }

    // 3️⃣ Sequence oxu
    const sequence = await accountSequenceRepository.findOneBy({ id: 1 });
    if (!sequence) {
      return next(errorHandler(500, "Account sequence tapılmadı"));
    }

    const nextAccountID = sequence.currentValue + 1;

    // 4️⃣ Account YOXDUR → CREATE
    if (!account) {
      account = new Account();
      account.card = card;
    }

    // 5️⃣ Account VAR amma boşdur → UPDATE
    account.accountID = nextAccountID;
    account.date = new Date();

    await accountRepository.save(account);

    // 6️⃣ Sequence artır
    sequence.currentValue = nextAccountID;
    await accountSequenceRepository.save(sequence);

    return res.status(201).json({
      success: true,
      message: "Hesab aktı yaradıldı",
      account,
    });
  } catch (error) {
    console.error(error);
    next(errorHandler(500, "Hesab aktı yaradılarkən xəta baş verdi"));
  }
};

export const createRepairForCard = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cardId } = req.body;
    const userId = req.userId;
    // 1️⃣ Mövcud kartı tap
    const card = await cardRepository.findOneBy({ id: cardId });
    if (!card) {
      return next(errorHandler(404, "Kart tapılmadı"));
    }

    let repair = await repairRepository.findOne({
      where: { card: { id: cardId } },
      relations: ["card"],
    });

    // 2️⃣ Account VAR və doludursa → STOP
    if (
      repair &&
      repair.repairId !== null &&
      repair.repairId !== undefined &&
      repair.repairId !== 0
    ) {
      return res.status(200).json({
        isExist: true,
        message: "Bu kart üçün artıq təmir aktı mövcuddur",
        repair,
      });
    }

    const sequence = await repairSequenceRepository.findOneBy({ id: 1 });
    if (!sequence) {
      return next(errorHandler(500, "Repair sequence tapılmadı"));
    }

    // console.log(sequence, "sequence");

    const nextAccountID = sequence.currentValue + 1;

    console.log(nextAccountID, "nextAccountID");

    // 4️⃣ Account YOXDUR → CREATE
    if (!repair) {
      repair = new Repair();
      repair.card = card;
    }

    // 5️⃣ Account VAR amma boşdur → UPDATE
    repair.repairId = nextAccountID;
    repair.date = new Date();

    await repairRepository.save(repair);
    // 6️⃣ Sequence artır
    sequence.currentValue = nextAccountID;
    console.log(sequence, "second Sequence");

    await repairSequenceRepository.save(sequence);

    return res.status(201).json({
      success: true,
      message: "Təmir aktı yaradıldı",
      repair,
    });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, error));
  }
};

export const closeCard = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cardId } = req.body;
    const userId = req.userId;
    // 1️⃣ Mövcud kartı tap
    const card = await cardRepository.findOneBy({ id: cardId });
    if (!card) {
      return next(errorHandler(404, "Kart tapılmadı"));
    }

    card.isOpen = false;
    card.closeDate = new Date();
    card.closedByUserId = userId;

    await cardRepository.save(card);

    res
      .status(201)
      .json({ success: true, message: "Kart uğurla bağlandı", card });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, error));
  }
};

export const getJobList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jobList = await jobListRepository.find();
    if (!jobList) {
      return next(errorHandler(404, "Job list tapılmadı"));
    }
    res.status(200).json(jobList);
  } catch (error) {
    console.log(error);
    next(errorHandler(500, error));
  }
};

export const createWorkCatalog = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, code, av } = req.body;
    const userId = req.userId;

    console.log(req.body);

    const newJobList = new JobList();
    newJobList.name = name;
    newJobList.code = code;
    newJobList.av = +av;

    await jobListRepository.save(newJobList);

    res.status(201).json({ success: true, jobList: newJobList });
  } catch (error) {
    console.log(error);
    next(errorHandler(500, error));
  }
};
