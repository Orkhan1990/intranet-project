import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { AllEntities } from "./AllEntities";
import { WarehouseParts } from "./WarehouseParts";
import { Brand } from "./Brand";
import { User } from "./User";
import { Supplier } from "./Supplier";

@Entity({ name: "warehouses" })
export class Warehouse extends AllEntities {

  @Column()
  requestId: string;

  @Column()
  invoice: string;

  @Column()
  market: string;

  @Column()
  paymentType: string;

  @Column()
  comment: string;

  @Column({ nullable: true })
  message: string;

  @OneToMany(() => WarehouseParts, (part) => part.warehouse, { cascade: true }) // specify inverse side as a second parameter
  parts: WarehouseParts[];

  @OneToOne(() => Supplier, (supplier) => supplier.warehouse,{cascade:true})
  @JoinColumn() // This will create a foreign key in the Supplier table
  supplier: Supplier;

  @ManyToOne(()=>User,(user)=>user.warehouses)
  user:User
}
