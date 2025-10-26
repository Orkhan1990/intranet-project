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
import { SparePart } from "./SparePart";
import { User } from "./User";
import { Supplier } from "./Supplier";
import { Order } from "./Order";
import { PrixodHist } from "./PrixodHist";

@Entity({ name: "prixods" })
export class Prixod extends AllEntities {
  @ManyToOne(() => Order, (order) => order.prixods, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" }) // <--- This adds the column
  order: Order;

  @Column()
  invoice: string;

  @Column()
  market: string;

  @Column({ name: "payment_type" })
  paymentType: string;

  @Column()
  comment: string;

  @Column({ nullable: true })
  message: string;

  @Column({ default: false })
  confirm: boolean;

  @Column()
  confirmDate: Date;

  @Column()
  accept: boolean;

  @Column()
  acceptDate: Date;

  @OneToMany(() => SparePart, (part) => part.prixod) // specify inverse side as a second parameter
  spareParts: SparePart[];

  @ManyToOne(() => Supplier, (supplier) => supplier.prixods, {
    onDelete: "CASCADE",
  })
  supplier: Supplier;

  @ManyToOne(() => User, (user) => user.prixods)
  user: User;

  @OneToMany(() => PrixodHist, (prixodHist) => prixodHist.prixod)
  prixodHist: PrixodHist[];
}
