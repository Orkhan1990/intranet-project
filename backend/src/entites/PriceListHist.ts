import { Column, Entity } from "typeorm";
import { AllEntities } from "./AllEntities";
import { Type } from "../enums/allEnums";

@Entity({ name: "price_list_hist" })
export class PriceListHist extends AllEntities {
  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  namede: string;

  @Column({ type: "varchar", length: 50 })
  kod: string;

  @Column({ type: "varchar", length: 50 })
  origKod: string;

  @Column({ type: "double" })
  price: number;

  @Column({ type: "int" })
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
  kvartal: number;
}
