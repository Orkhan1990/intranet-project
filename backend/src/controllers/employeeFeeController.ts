import { NextFunction, Response } from "express";
import { CustomRequest } from "../middleware/verifyToken";
import errorHandler from "../middleware/errorHandler";
import { AppDataSource } from "../database";
import { CardWorkerJob } from "../entites/CardWorkerJob";

const cardWorkerJobRepository = AppDataSource.getRepository(CardWorkerJob);

export const filterEmployeeFee = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { startDate, endDate, clientId, cardNumber, paymentType, fired } =
      req.body.filters;

    const qb = cardWorkerJobRepository
      .createQueryBuilder("cw")
      .leftJoin("cw.user", "worker")
      .leftJoin("cw.cardJob", "job")
      .leftJoin("job.card", "card")
      .leftJoin("card.client", "client")
      .select("worker.id", "workerId")
      .addSelect("CONCAT(worker.name, ' ', worker.surname)", "fullName")
      .addSelect(
        "SUM(cw.earnedSalary) FILTER (WHERE job.oil != 33.3 OR job.oil IS NULL)",
        "normalSalary"
      )
      .addSelect(
        "SUM(cw.earnedSalary) FILTER (WHERE job.oil = 33.3)",
        "oilSalary"
      )
      .groupBy("worker.id")
      .addGroupBy("worker.name")
      .addGroupBy("worker.surname")
      .orderBy("fullName", "ASC");

    // 🔹 Filters
    if (startDate && endDate)
      qb.andWhere("cw.date BETWEEN :startDate AND :endDate", { startDate, endDate });
    if (clientId) qb.andWhere("client.id = :clientId", { clientId });
    if (cardNumber)
      qb.andWhere("card.cardNumber ILIKE :cardNumber", { cardNumber: `%${cardNumber}%` });
    if (paymentType) qb.andWhere("card.paymentType = :paymentType", { paymentType });
    if (fired !== undefined) qb.andWhere("worker.fired = :fired", { fired });

    const result = await qb.getRawMany();

    // 🔹 Map result to frontend-friendly format
    const mapped = result.map((item) => ({
      workerId: Number(item.workerId),
      fullName: item.fullName,
      normalSalary: Number(item.normalSalary || 0),
      oilSalary: Number(item.oilSalary || 0),
    }));

    console.log(mapped);
    

    res.status(200).json({ data: mapped });
  } catch (error) {
    console.error(error);
    next(errorHandler(500, "Server error"));
  }
};
