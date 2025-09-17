import { Column, Entity } from "typeorm";
import { AllEntities } from "./AllEntities";

@Entity({ name: "rabatgrup" })
export class Rabatgrup extends AllEntities {
  @Column({
    name: "rabatgrup_ind",
    type: "int",
    nullable: true,
  })
  rabatgrupInd: number;

  @Column({
    name: "discount",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  discount: string;

  @Column({
    name: "notation",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  notation: string;
}
