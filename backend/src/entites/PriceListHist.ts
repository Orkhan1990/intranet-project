import { Column, Entity } from "typeorm";
import { AllEntities } from "./AllEntities";
import { Type } from "../enums/allEnums";

@Entity({ name: "price_list_hist" })
export class PriceListHist extends AllEntities {
  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  namede: string;

  @Column({ type: "varchar", length: 50,nullable: true, default: null })
  kod: string;

  @Column({ type: "varchar", length: 50 })
  origKod: string;

 @Column({
    name: "price",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  price: string;

    @Column({ type: "int" })
  weight: number;

  @Column({ type: "int",nullable: true, default: null })
  quantity: number;

  @Column({
    type: "enum",
    enum: Type,
    enumName: "type",
  })
  type: Type;

  @Column()
  rabatgrup: number;

  @Column({ type: "int", nullable: true })
  year: number;

  @Column({ type: "int", nullable: true })
  month: number;
}
