import { NextFunction, Response } from "express";
import { CustomRequest } from "../middleware/verifyToken";
import errorHandler from "../middleware/errorHandler";
import { AppDataSource } from "../database";
import { User } from "../entites/User";

export const filterEmployeeFee = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { startDate, endDate, clientId, paymentType, cardNumber } =
      req.body.filters.filters;

    //  const start = new Date(startDate);
    //  const end = new Date(endDate);
    //  console.log(req.body.filters);
    // console.log(req.body.filters.filters.startDate);

    const qb = AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .leftJoin("user.cardWorkerJobs", "cw")
      .leftJoin("cw.cardJob", "job");

    // 🔹 Dinamik JOIN şərti
    let joinCondition = "card.isOpen = :isOpen";
    const params: any = { isOpen: false };

    if (startDate) {
      joinCondition += " AND card.closeDate BETWEEN :startDate AND :endDate";
      params.startDate = `${startDate} 00:00:00`;
      params.endDate = `${endDate ?? startDate} 23:59:59`; // endDate yoxdursa startDate ilə eyni
    }

    if (cardNumber) {
      joinCondition += " AND card.id LIKE :cardNumber";
      params.cardNumber = `%${cardNumber}%`;
    }

    if (paymentType) {
      joinCondition += " AND card.paymentType = :paymentType";
      params.paymentType = paymentType;
    }

    if (clientId) {
      joinCondition += " AND card.clientId = :clientId";
      params.clientId = clientId;
    }

    qb.leftJoin("job.card", "card", joinCondition, params);

    qb.where("user.isWorker = :isWorker", { isWorker: true }).andWhere(
      "user.userRole = :role",
      { role: "ServiceUser" },
    );

    qb.select([
      "user.id as id",
      "user.firstName as firstName",
      "user.lastName as lastName",
      "user.userName as userName",
      "user.percent as percent",

      `
      COALESCE(
        SUM(
          CASE 
            WHEN card.id IS NOT NULL 
              AND job.oil > 0
            THEN
              COALESCE(
                cw.earnedSalary,
                job.price * COALESCE(user.percent, 0) / 100
              )
            ELSE 0
          END
        ),
        0
      ) as oilSalary
      `,

      `
      COALESCE(
        SUM(
          CASE 
            WHEN card.id IS NOT NULL 
            THEN COALESCE(cw.workerAv, 0)
            ELSE 0
          END
        ),
        0
      ) as totalAv
      `,
    ])
      .groupBy("user.id")
      .addGroupBy("user.firstName")
      .addGroupBy("user.lastName")
      .addGroupBy("user.userName");

    // 🔎 Debug üçün
    // console.log(qb.getSql());
    // console.log(qb.getParameters());

    const data = await qb.getRawMany();
    console.log(data);

    res.json(data);
  } catch (err) {
    next(err);
  }
};


