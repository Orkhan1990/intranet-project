import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { AllEntities } from "./AllEntities";
import { WarehouseParts } from "./WarehouseParts";
import { Brand } from "./Brand";
import { User } from "./User";

@Entity({ name: "warehouses" })
export class Warehouse extends AllEntities {
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

  @OneToOne(() => Brand, (brand) => brand.warehouse, { cascade: true })
  @JoinColumn() // This will create a foreign key in the Brand table
  brand: Brand;

  @ManyToOne(()=>User,(user)=>user.warehouses)
  user:User
}
