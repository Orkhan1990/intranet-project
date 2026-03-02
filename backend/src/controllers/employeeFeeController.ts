import { NextFunction, Response } from "express";
import { CustomRequest } from "../middleware/verifyToken";
import errorHandler from "../middleware/errorHandler";
import { AppDataSource } from "../database";
import { User } from "../entites/User";


export const filterEmployeeFee = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { startDate, endDate, clientId, cardNumber } = req.body.filters;

    const qb = AppDataSource.getRepository(User)
      .createQueryBuilder("worker")
      // 🔹 yalnız service user və percent tipli işçilər
      .where("worker.userRole = :role", { role: "ServiceUser" })
      .andWhere("worker.salaryType = :salaryType", { salaryType: "percent" })

      // 🔹 LEFT JOIN-lər
      .leftJoin("worker.cardWorkerJobs", "cw")
      .leftJoin("cw.cardJob", "job")
      .leftJoin("job.card", "card")
      .leftJoin("card.client", "client")

      // 🔹 Seçim
      .select([
        "worker.id AS workerId",
        "CONCAT(worker.firstName, ' ', worker.lastName) AS fullName",
        `
        COALESCE(SUM(
          CASE 
            WHEN card.is_open = false
             AND (:startDate IS NULL OR card.close_date >= :startDate)
             AND (:endDate IS NULL OR card.close_date <= :endDate)
             AND (:clientId IS NULL OR card.clientId = :clientId)
             AND (:cardNumber IS NULL OR card.car_number LIKE :cardNumber)
            THEN cw.worker_av
            ELSE 0
          END
        ), 0) AS totalAv
        `,
        `
        COALESCE(SUM(
          CASE 
            WHEN card.is_open = false
             AND (:startDate IS NULL OR card.close_date >= :startDate)
             AND (:endDate IS NULL OR card.close_date <= :endDate)
             AND (:clientId IS NULL OR card.clientId = :clientId)
             AND (:cardNumber IS NULL OR card.car_number LIKE :cardNumber)
            THEN cw.earned_salary
            ELSE 0
          END
        ), 0) AS totalSalary
        `
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