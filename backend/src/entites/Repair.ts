import { Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { AllEntities } from "./AllEntities";
import { Card } from "./Card";

@Entity({ name: "repairs" })
export class Repair extends AllEntities {

  @Column({ name: "repair_id" })
  repairId: string;

  @Column({ type: "timestamp", name: "date" })
  date: Date;

  @Column({ type: "double", name: "otk", nullable: true })
  otk: number;

  // ✅ owning side
  @OneToOne(() => Card, (card) => card.repair, { onDelete: "CASCADE" })
  @JoinColumn({ name: "card_id" })
  card: Card;
}
