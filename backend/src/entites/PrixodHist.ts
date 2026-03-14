import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AllEntities } from "./AllEntities";
import { Order } from "./Order";
import { Prixod } from "./Prixod";
import { User } from "./User";

@Entity({ name: "prixod_hist" })
export class PrixodHist extends AllEntities {
  @ManyToOne(() => Order, (order) => order.prixodHist, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" })
  order: Order;

  @ManyToOne(() => Prixod, (prixod) => prixod.prixodHist, { onDelete: "CASCADE" })
  @JoinColumn({ name: "prixod_id" })
  prixod: Prixod;

  @ManyToOne(() => User, (user) => user.prixodHist)
  user: User;

  @Column({ name: "level" })
  level: string;

  @Column({ default: false })
  confirm: boolean;

  @Column({ nullable: true })
  message: string;

  @Column({ type: "timestamp", nullable: true })
  confirmDate: Date;

  @Column({ default: false })
  accept: boolean;

  @Column({ type: "timestamp", nullable: true })
  acceptDate: Date;

  @Column({ nullable: true })
  reject: string;

  @Column({ name: "date", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  @Column({ nullable: true })
  file: string;
}