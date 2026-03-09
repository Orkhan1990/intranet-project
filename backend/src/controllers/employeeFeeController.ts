import { NextFunction, Response } from "express";
import { CustomRequest } from "../middleware/verifyToken";
import { AppDataSource } from "../database";
import { User } from "../entites/User";

export const filterEmployeeFee = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { startDate, endDate, clientId, paymentType, cardNumber } =
      req.body.filters?.filters || {};

    console.log(startDate, endDate, clientId);

    const params: any = {};
    let joinCondition = "c.id = j.card_id AND c.is_open = 0";

    const hasFilter =
      startDate || endDate || clientId || paymentType || cardNumber;

    // 🔹 Əgər heç bir filter yoxdursa bütün nəticələri 0 et
    if (!hasFilter) {
      joinCondition += " AND 1 = 0";
    }

    // 🔹 Tarix filter
    if (startDate && endDate) {
      joinCondition += " AND c.close_date BETWEEN :startDate AND :endDate";
      params.startDate = `${startDate} 00:00:00`;
      params.endDate = `${endDate} 23:59:59`;
    } else if (startDate) {
      const end = new Date().toISOString().slice(0, 10) + " 23:59:59";
      joinCondition += " AND c.close_date BETWEEN :startDate AND :endDate";
      params.startDate = `${startDate} 00:00:00`;
      params.endDate = end;
    }

    // 🔹 Client filter
    if (clientId) {
      joinCondition += " AND c.client.id = :clientId";
      params.clientId = clientId;
    }

    // 🔹 Payment type
    if (paymentType) {
      joinCondition += " AND c.payment_type = :paymentType";
      params.paymentType = paymentType;
    }

    // 🔹 Card number
    if (cardNumber) {
      joinCondition += " AND c.id LIKE :cardNumber";
      params.cardNumber = `%${cardNumber}%`;
    }

    const query = AppDataSource.getRepository(User)
      .createQueryBuilder("u")
      .leftJoin("card_worker_jobs", "cw", "cw.worker_id = u.id")
      .leftJoin("card_jobs", "j", "j.id = cw.card_job_id")
      .leftJoin("cards", "c", joinCondition, params)
      .select("u.id", "id")
      .addSelect("u.first_name", "firstName")
      .addSelect("u.last_name", "lastName")
      .addSelect("u.percent", "percent")

      // AV
      .addSelect(
        `
        COALESCE(SUM(
          CASE
            WHEN c.id IS NOT NULL AND j.code <> 'Y1'
            THEN cw.worker_av
            ELSE 0
          END
        ),0)
      `,
        "totalAv",
      )

      // Normal maaş
      .addSelect(
        `
        COALESCE(SUM(
          CASE
            WHEN c.id IS NOT NULL AND j.code <> 'Y1'
            THEN cw.earnedSalary
            ELSE 0
          END
        ),0)
      `,
        "salary",
      )

      // Yağ maaşı
      .addSelect(
        `
        COALESCE(SUM(
          CASE
            WHEN c.id IS NOT NULL AND j.code = 'Y1'
            THEN (j.oil / 33.3) * 9.99
            ELSE 0
          END
        ),0)
      `,
        "oilSalary",
      )

      .where("u.isWorker = :isWorker", { isWorker: 1 })
      .groupBy("u.id")
      .addGroupBy("u.first_name")
      .addGroupBy("u.last_name")
      .addGroupBy("u.percent");

    const data = await query.getRawMany();

    res.json(data);
  } catch (err) {
    next(err);
  }
};