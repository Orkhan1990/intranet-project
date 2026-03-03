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
 const rawData = await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .leftJoin("user.cardWorkerJobs", "cw")
      .leftJoin("cw.cardJob", "job")
      .leftJoin("job.card", "card")
      .where("user.isWorker = :isWorker", { isWorker: true })
      .andWhere("user.userRole = :role", { role: "ServiceUser" })
      .andWhere(
        "(card.id IS NULL OR (card.isOpen = false " +
          "AND (:startDate IS NULL OR card.openDate >= :startDate) " +
          "AND (:endDate IS NULL OR card.openDate <= :endDate) " +
          "AND (:clientId IS NULL OR card.clientId = :clientId) " +
          "AND (:cardNumber IS NULL OR card.carNumber LIKE :cardNumber)))",
        {
          startDate,
          endDate,
          clientId,
          cardNumber: cardNumber ? `%${cardNumber}%` : null,
        }
      )
      .select([
        "user.id AS userId",
        "user.userName AS userName",
        "user.firstName AS firstName",
        "user.lastName AS lastName",
        "cw.earnedSalary AS earnedSalary",
        "cw.workerAv AS workerAv",
        "job.price AS jobPrice",
        "job.oil AS jobOil",
        "card.isOpen AS cardIsOpen",
      ])
      .getRawMany();

    // 2️⃣ JS-də reduce ilə user-lərə toplama və jobs array
    const usersMap = new Map<number, any>();

    rawData.forEach((row) => {
      const userId = row.userId;
      if (!usersMap.has(userId)) {
        usersMap.set(userId, {
          id: userId,
          userName: row.userName,
          firstName: row.firstName,
          lastName: row.lastName,
          totalSalary: 0,
          totalAv: 0,
          jobs: [],
        });
      }

      const user = usersMap.get(userId);

      // Yalnız bağlı kartlar üzrə toplama
      if (row.cardIsOpen === 0 || row.cardIsOpen === false) { // MySQL boolean = 0/1
        user.totalSalary += Number(row.earnedSalary || 0);
        user.totalAv += Number(row.workerAv || 0);

        if (row.jobPrice !== null) {
          user.jobs.push({
            jobPrice: row.jobPrice,
            jobOil: row.jobOil,
            cardIsOpen: Boolean(row.cardIsOpen),
          });
        }
      }
    });

    const data = Array.from(usersMap.values());

console.log(rawData);
    

    res.json(data);
  } catch (err) {
    next(err);
  }
};