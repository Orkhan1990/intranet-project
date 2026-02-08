// src/entities/CardExpense.ts
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { AllEntities } from "./AllEntities";
import { Card } from "./Card";

@Entity({ name: "card_expenses" })
export class CardExpense extends AllEntities {
  @Column()
  description: string;

  @Column({ type: "double", default: 0 })
  price: number;

  @ManyToOne(() => Card, (card) => card.expenses, { onDelete: "CASCADE" })
  @JoinColumn({ name: "card_id" })
  card: Card;


}
