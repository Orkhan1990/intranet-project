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
    .createQueryBuilder("user")
    .leftJoin("user.cardWorkerJobs", "cw")
    .leftJoin("cw.cardJob", "job");

  // 🔹 Dinamik JOIN şərti (yalnız bağlı kartlar)
  let joinCondition = "card.isOpen = :isOpen";
  const params: any = { isOpen: false };

 if (startDate) {
    joinCondition += " AND card.closeDate >= :startDate";
    params.startDate = startDate;
  }

  if (endDate) {
    joinCondition += " AND card.closeDate <= :endDate";
    params.endDate = endDate;
  }

  if (cardNumber) {
    joinCondition += " AND card.carNumber LIKE :cardNumber";
    params.cardNumber = `%${cardNumber}%`;
  }

  if (clientId) {
    joinCondition += " AND card.clientId = :clientId";
    params.clientId = clientId;
  }

  qb.leftJoin("job.card", "card", joinCondition, params);

  qb.where("user.isWorker = :isWorker", { isWorker: true })
    .andWhere("user.userRole = :role", { role: "ServiceUser" });

  qb.select([
    "user.id as id",
    "user.firstName as firstName",
    "user.lastName as lastName",
    "user.userName as userName",

    // 🔹 Əsas maaş (oil olmayan işlər)
    `
    COALESCE(
      SUM(
        CASE 
          WHEN card.id IS NOT NULL 
            AND (job.oil IS NULL OR job.oil = 0)
          THEN
            COALESCE(
              cw.earnedSalary,
              job.price * COALESCE(user.percent, 0) / 100
            )
          ELSE 0
        END
      ),
      0
    ) as totalSalary
    `,

    // 🔹 Yağ maaşı (oil > 0 olan işlər)
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

    // 🔹 Ümumi AV
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
    `
  ])
    .groupBy("user.id")
    .addGroupBy("user.firstName")
    .addGroupBy("user.lastName")
    .addGroupBy("user.userName");



        const data= await qb.getRawMany();
        console.log(data);
        
    res.json(data);
  } catch (err) {
    next(err);
  }
};