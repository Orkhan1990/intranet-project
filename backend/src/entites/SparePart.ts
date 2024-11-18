import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { AllEntities } from "./AllEntities";
import { Invoice } from "./Invoice";
import { Brand } from "./Brand";



@Entity({name:"spare_parts"})
export class SparePart extends AllEntities{

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

  @ManyToOne(() => Brand, (brand) => brand.spareParts)
  @JoinColumn() // This will create a foreign key in the Brand table
  brand: Brand;

  @ManyToOne(() => Invoice, (invoice) =>invoice.spareParts) // specify inverse side as a second parameter
  invoice: Invoice

  

}