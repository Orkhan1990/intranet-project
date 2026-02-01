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
    const { startDate, endDate, clientId, cardNumber, paymentType } =
      req.body.filters;

    console.log(req.body);

    const qb = AppDataSource.getRepository(User)
      .createQueryBuilder("worker")

      // 🔹 yalnız service user-lər
      .where("worker.userRole = :role", { role: "ServiceUser" })

      // 🔹 LEFT JOIN – hamı görünsün deyə
      .leftJoin("worker.cardWorkerJobs", "cw")
      .leftJoin("cw.cardJob", "job")
      .leftJoin("job.card", "card")
      .leftJoin("card.client", "client")

      .select([
        "worker.id AS workerId",
        "CONCAT(worker.firstName, ' ', worker.lastName) AS fullName",

        // 🔢 AV
        `
    COALESCE(SUM(
      CASE 
        WHEN card.is_open = false
         AND (:startDate IS NULL OR card.close_date >= :startDate)
         AND (:endDate IS NULL OR card.close_date <= :endDate)
         AND (:clientId IS NULL OR card.clientId = :clientId)
         AND (:cardNumber IS NULL OR card.car_number LIKE :cardNumber)
        THEN cw.workerAv
        ELSE 0
      END
    ), 0) AS totalAv
    `,

        // 💰 NORMAL
        `
    COALESCE(SUM(
      CASE 
        WHEN card.is_open = false
         AND (job.oil != 33.3 OR job.oil IS NULL)
         AND (:startDate IS NULL OR card.close_date >= :startDate)
         AND (:endDate IS NULL OR card.close_date <= :endDate)
         AND (:clientId IS NULL OR card.clientId = :clientId)
         AND (:cardNumber IS NULL OR card.car_number LIKE :cardNumber)
        THEN cw.earnedSalary
        ELSE 0
      END
    ), 0) AS normalSalary
    `,

        // 🛢 OIL
        `
    COALESCE(SUM(
      CASE 
        WHEN card.is_open = false
         AND job.oil = 33.3
         AND (:startDate IS NULL OR card.close_date >= :startDate)
         AND (:endDate IS NULL OR card.close_date <= :endDate)
         AND (:clientId IS NULL OR card.clientId = :clientId)
         AND (:cardNumber IS NULL OR card.car_number LIKE :cardNumber)
        THEN cw.earnedSalary
        ELSE 0
      END
    ), 0) AS oilSalary
    `,
      ])

      .groupBy("worker.id")
      .addGroupBy("worker.firstName")
      .addGroupBy("worker.lastName")

      .setParameters({
        startDate: startDate || null,
        endDate: endDate || null,
        clientId: clientId || null,
        cardNumber: cardNumber ? `%${cardNumber}%` : null,
      })

      .orderBy("fullName", "ASC");

    const data = await qb.getRawMany();

    console.log(data);

    res.json(data);
  } catch (error) {
    console.error(error);
    next(errorHandler(500, "Server error"));
  }
};
