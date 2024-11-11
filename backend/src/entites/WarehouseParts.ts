import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { AllEntities } from "./AllEntities";
import { Warehouse } from "./Warehouse";
import { Brand } from "./Brand";



@Entity({name:"warehouse_parts"})
export class WarehouseParts extends AllEntities{

  @Column()
  code:string

  @Column()
  origCode:string

  @Column()
  name:string

  @Column()
  liquidity:string


  @Column()
  count:number

  @Column()
  price:number

  @Column({name:"sell_price"})
  sellPrice:number

  @OneToOne(() => Brand, (brand) => brand.warehouseParts, { cascade: true })
  @JoinColumn() // This will create a foreign key in the Brand table
  brand: Brand;

  @ManyToOne(() => Warehouse, (warehouse) =>warehouse.parts) // specify inverse side as a second parameter
  warehouse: Warehouse

  

}