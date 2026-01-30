import { NextFunction, Response } from "express";
import { CustomRequest } from "../middleware/verifyToken";
import errorHandler from "../middleware/errorHandler";
import { AppDataSource } from "../database";
import { CardWorkerJob } from "../entites/CardWorkerJob";
import { User } from "../entites/User";
import { CardJob } from "../entites/CardJob";
import { Card } from "../entites/Card";
import { Client } from "../entites/Client";

const cardWorkerJobRepository = AppDataSource.getRepository(CardWorkerJob);

export const filterEmployeeFee = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      startDate,
      endDate,
      clientId,
      cardNumber,
      paymentType,
    } = req.body.filters;

    console.log(req.body);
    

   const qb = cardWorkerJobRepository
  .createQueryBuilder("cw")
  .leftJoinAndSelect("cw.user", "worker") // bütün işçilər
  .leftJoin("cw.cardJob", "job")
  .leftJoin("job.card", "card")
  .leftJoin("card.client", "client")
  .select([
    "worker.id AS workerId",
    "CONCAT(worker.firstName, ' ', worker.lastName) AS fullName",
    "COALESCE(SUM(CASE WHEN cw.date BETWEEN :start AND :end THEN cw.workerAv ELSE 0 END), 0) AS totalAv",
    "COALESCE(SUM(CASE WHEN (cw.date BETWEEN :start AND :end) AND (job.oil != 33.3 OR job.oil IS NULL) THEN cw.earnedSalary ELSE 0 END), 0) AS normalSalary",
    "COALESCE(SUM(CASE WHEN (cw.date BETWEEN :start AND :end) AND (job.oil = 33.3) THEN cw.earnedSalary ELSE 0 END), 0) AS oilSalary",
  ])
  .where("worker.userRole = :role", { role: "ServiceUser" })
  .groupBy("worker.id")
  .setParameters({ start: startDate, end: endDate });

    // 🧑‍🔧 YALNIZ SERVICE USER
    qb.where("worker.userRole = :role", { role: "ServiceUser" });

    // 🔒 YALNIZ BAĞLI KARTLAR
    qb.andWhere("(card.is_open = false OR card.id IS NULL)");

    // 📅 TARİX
    if (startDate && endDate) {
      qb.andWhere(
        "(cw.date BETWEEN :start AND :end OR cw.id IS NULL)",
        { start: startDate, end: endDate }
      );
    }

    // 🧾 CLIENT
    if (clientId) {
      qb.andWhere("(card.clientId = :clientId OR card.id IS NULL)", {
        clientId,
      });
    }

    // 🚗 CARD NUMBER
    if (cardNumber) {
      qb.andWhere(
        "(card.car_number LIKE :cardNumber OR card.id IS NULL)",
        { cardNumber: `%${cardNumber}%` }
      );
    }

    // 💳 PAYMENT TYPE
    if (paymentType) {
      qb.andWhere(
        "(card.payment_type = :paymentType OR card.id IS NULL)",
        { paymentType }
      );
    }

    // 🧮 SELECT
    qb.select([
      "worker.id AS workerId",
      "CONCAT(worker.firstName, ' ', worker.lastName) AS fullName",

      // 🔢 AV – həmişə görünsün
      "COALESCE(SUM(cw.workerAv), 0) AS totalAv",

      // 🟢 NORMAL MAAŞ
      `
      COALESCE(SUM(
        CASE 
          WHEN job.oil != 33.3 OR job.oil IS NULL
          THEN cw.earnedSalary
          ELSE 0
        END
      ), 0) AS normalSalary
      `,

      // 🟠 OIL MAAŞ
      `
      COALESCE(SUM(
        CASE 
          WHEN job.oil = 33.3
          THEN cw.earnedSalary
          ELSE 0
        END
      ), 0) AS oilSalary
      `,
    ]);

    qb.groupBy("worker.id");
    qb.addGroupBy("worker.firstName");
    qb.addGroupBy("worker.lastName");

    qb.orderBy("fullName", "ASC");

    const data = await qb.getRawMany();

    console.log(data);
    

    res.json(data);
  } catch (error) {
    console.error(error);
    next(errorHandler(500, "Server error"));
  }
};
