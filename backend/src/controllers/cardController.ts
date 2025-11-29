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
    console.log(id, selectedCount);

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
    const userId = req.userId;

    log(cardData);

    // =============================
    // 1) AV TOPLAMI
    // =============================
    const avSum = cardData.jobs.reduce(
      (sum: number, job: any) => sum + Number(job.av || 0), //bu duzdur
      0
    );

    // =============================
    // 2) WORKER-ID-LƏRİ YIĞIRIQ
    // =============================
    const workerIds = cardData.jobs.flatMap((j: any) =>
      j.jobWorkers.map((jw: any) => Number(jw.workerId))
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

    const workSum = cardData.jobs.reduce((sum: number, j: any) => {
      const av = Number(j.av || 0);
      const globalDiscount = Number(j.discount || 0);
      const price = av * 50 * (1 - globalDiscount / 100);
      return sum + price;
    }, 0);

    const workSumOwn = cardData.jobs.reduce((sum: number, j: any) => {
      const av = Number(j.av || 0);
      const globalDiscount = Number(j.discount || 0);
      // const price = av * 50 * (1 - globalDiscount / 100);
      let workerTotalSumOwn = 0;
      for (const jw of j.jobWorkers) {
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
    if (Array.isArray(cardData.problems)) {
      for (const p of cardData.problems) {
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
    if (Array.isArray(cardData.jobs)) {
      for (const j of cardData.jobs) {
        const av = Number(j.av || 0);
        const discount = Number(j.discount || 0);

        const price = av * 50* (1 - discount / 100);

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
        if (Array.isArray(j.jobWorkers)) {
          for (const jw of j.jobWorkers) {
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
            wj.earnedSalary =Number(jw.workerAv) * 50 * (1 - discount / 100) * (user.percent / 100);

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
