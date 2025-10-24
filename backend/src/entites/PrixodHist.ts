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

@Entity({ name: "prixod_hist" })
export class PrixodHist extends AllEntities {
  @ManyToOne(() => Order, (order) => order.prixodHist, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" }) // <--- This adds the column
  order: Order;

  @Column({ name: "level" })
  level: string;

  @Column()
  confirm: false;

  @Column({ nullable: true })
  reject: string;

  @Column({ name: "date" })
  date: Date;

  @Column({ nullable: true })
  file: string;

  @ManyToOne(() => User, (user) => user.prixods)
  user: User;
}
