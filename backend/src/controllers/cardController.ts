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
import { WorkerSalary } from "../entites/WorkerSalary";

const cardParts = AppDataSource.getRepository(CardPart);
const cardRepository = AppDataSource.getRepository(Card);
const sparePartsRepository = AppDataSource.getRepository(SparePart);
const userRepository = AppDataSource.getRepository(User);
const workerSalaryRepo = AppDataSource.getRepository(WorkerSalary);
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
    const { cardData} = req.body;

    

    const userId = req.userId;

    console.log("CARD DATA:", cardData);

    // =============================
    // 1) CARD YARAT
    // =============================
    const avSum = cardData.jobs.reduce(
      (sum: any, j: any) => sum + Number(j.av || 0),
      0
    );
    const workerIds = cardData.jobs.flatMap((j: any) =>
      j.jobWorkers.map((jw: any) => Number(jw.workerId))
    );

    const uniqueWorkerIds = [...new Set(workerIds)];

    // user-lərin faizlərini gətiririk
    const workers = await userRepository.find({
      where: { id: In(uniqueWorkerIds) },
    });

   const workSum = cardData.jobs.reduce((sum:any, j:any) => {
  const av = Number(j.av || 0);
  const discount = Number(j.discount || 0);
  const price = av * 50 * (1 - discount / 100);
  return sum + price;
}, 0);

    // map şəklində saxlayaq
    const workerMap = new Map();
    workers.forEach((w) => {
      workerMap.set(w.id, w.percent); // məsələn 15%
    });

    let workSumOwn = 0;

    for (const job of cardData.jobs) {
      const jobAv = Number(job.av) || 0;

      for (const jw of job.jobWorkers) {
        const workerId = Number(jw.workerId);
        const percent = workerMap.get(workerId) || 0;

        const income = jobAv * (percent / 100);

        workSumOwn += income;
      }
    }

    const newCard=new Card();
    newCard.clientId=Number(cardData.clientId);
      newCard.type= cardData.type;
      newCard.manufactured= cardData.manufactured;
      newCard.model= cardData.model;
      newCard.sassi= cardData.sassi;
      newCard.carNumber= cardData.carNumber;
      newCard.produceDate= cardData.produceDate;
      newCard.km= cardData.km;
      newCard.qostNumber= cardData.qostNumber;
      newCard.paymentType= cardData.paymentType;
      newCard.nds= cardData.nds;
      newCard.repairAgain= cardData.repairAgain;
      newCard.servisInfo= cardData.servisInfo;
      newCard.comments= cardData.comments;
      newCard.recommendation= cardData.recommendation;
      newCard.workSum= workSum;
      newCard.avSum= avSum;
      newCard.openDate= new Date();
      newCard.workSumOwn= workSumOwn;
      newCard.userId= userId;

    


    const savedCard = await cardRepository.save(newCard);

    // =============================
    // 2) PROBLEMLƏRİ YARAT
    // =============================
    if (Array.isArray(cardData.problems)) {
      for (const p of cardData.problems) {

        const newCardProblem=new CardProblem();
        newCardProblem.description=p.description;
        newCardProblem.cardId=savedCard.id;
    

        const savedProblem = await cardProblemRepository.save(newCardProblem);

        // serviceWorkers varsa ManyToMany append edirik
        if (Array.isArray(p.serviceWorkers)) {
          for (const workerId of p.serviceWorkers) {
            await queryRunner.manager
              .createQueryBuilder()
              .relation(CardProblem, "serviceWorkers")
              .of(savedProblem)
              .add(Number(workerId)); 
          }
        }
      }
    }

    // =============================
    // 3) JOB-ları və WorkerJob-ları yarat
    // =============================

if (Array.isArray(cardData.jobs)) {
  for (const j of cardData.jobs) {
    const av = Number(j.av || 0);
    const discount = Number(j.discount || 0);

    const price = av * 50 * (1 - discount / 100);

    const newJob=new CardJob();
    newJob.code=j.code;
    newJob.name=j.name;
    newJob.av=av;
    newJob.price=price;
    newJob.discount=discount;
    newJob.oil=j.oil;
    newJob.cardId=savedCard.id;

  

      const savedJob=await cardJobRepo.save(newJob);

    // jobWorkers
    if (Array.isArray(j.jobWorkers)) {
      for (const jw of j.jobWorkers) {
        const workerId = Number(jw.workerId);

        const user= await userRepository.findOneBy({ id:workerId});
        if(!user){
          next(errorHandler(404, "İşçi tapılmadı"));
          return;
        }

        // WorkerJob daxil edirik
        const newWorkerJob=new CardWorkerJob();
        newWorkerJob.workerAv=Number(jw.workerAv);
        newWorkerJob.user=user;
        newWorkerJob.cardJobId=savedJob.id;
        newWorkerJob.salaryPercent=user.percent;
        newWorkerJob.earnedSalary=user.percent * av * 50 / 100;

    

        await cardWorkerJobRepo.save(newWorkerJob);

        // USER faizini götürürük
        const percent = workerMap.get(workerId) || 0;

        // MAİSH HESABLANMASI
        const amount = av * 50 * (percent / 100);

        // WorkerSalary INSERT

        const newWorkerSalary=new WorkerSalary();
        newWorkerSalary.workerId=workerId;
        newWorkerSalary.cardId=savedCard.id;
        newWorkerSalary.cardJobId=savedJob.id;
        newWorkerSalary.amount=amount;
        newWorkerSalary.date=new Date();
        await workerSalaryRepo.save(newWorkerSalary);
      }
    }
  }
}


    // =============================
    // 4) XƏRCLƏR (expences)
    // =============================
    if (Array.isArray(cardData.expences)) {
      for (const e of cardData.expences) {

        const newExpense=new CardExpense();
        newExpense.description=e.description;
        newExpense.price=Number(e.price);
        newExpense.cardId=savedCard.id;
     
        await cardExpenseRespoisitory.save(newExpense);
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
