import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { AllEntities } from "./AllEntities";
import { User } from "./User";
import { Order } from "./Order";
import { Prixod } from "./Prixod";

@Entity({ name: "prixod_hist" })
export class PrixodHist extends AllEntities {
  @ManyToOne(() => Order, (order) => order.prixodHist, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" }) // <--- This adds the column
  order: Order;

  @Column({ name: "level" })
  level: string;

  @Column({default:false})
  confirm: boolean;

  @Column({ nullable: true })
  message: string;

  @Column()
  confirmDate: Date;

  @Column({ default: false })
  accept: boolean;

  @Column()
  acceptDate: Date;

  @Column({ nullable: true })
  reject: string;

  @Column({ name: "date" })
  date: Date;

  @Column({ nullable: true })
  file: string;

  @ManyToOne(() => User, (user) => user.prixods)
  user: User;

  @ManyToOne(() => Prixod, (prixod) => prixod.prixodHist, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "prixod_id" }) // <--- This adds the column
  prixod: Prixod;
}
