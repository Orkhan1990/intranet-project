import { NextFunction, Request, Response } from "express";
import errorHandler from "../middleware/errorHandler";
import { AppDataSource } from "../database";
import { CardPart } from "../entites/CardPart";
import { Card } from "../entites/Card";
import { SparePart } from "../entites/SparePart";

const cardParts = AppDataSource.getRepository(CardPart);
const cardRepository = AppDataSource.getRepository(Card);
const sparePartsRepository = AppDataSource.getRepository(SparePart);
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
      newcardPart.count=selectedCount;
      newcardPart.date=new Date();
      newcardPart.partName=part.name;
      newcardPart.soldPrice=part.sellPrice;
      await cardParts.save(newcardPart);
      res.status(201).json({ message: "Məhsul əlavə olundu" });
    } else {
    }
  } catch (error) {
    next(errorHandler(401, error));
  }
};
