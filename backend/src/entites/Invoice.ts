import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { AllEntities } from "./AllEntities";
import { SparePart } from "./SparePart";
import { User } from "./User";
import { Supplier } from "./Supplier";

@Entity({ name: "invoices" })
export class Invoice extends AllEntities {

  @Column()
  requestId: string;

  @Column()
  invoice: string;

  @Column()
  market: string;

  @Column({name:"payment_type"})
  paymentType: string;

  @Column()
  comment: string;

  @Column({ nullable: true })
  message: string;

  @OneToMany(() => SparePart, (part) => part.invoice) // specify inverse side as a second parameter
  spareParts: SparePart[];

  @ManyToOne(() => Supplier, (supplier) => supplier.invoices,{onDelete:"CASCADE"})
  supplier: Supplier;

  @ManyToOne(()=>User,(user)=>user.invoices)
  user:User
}
