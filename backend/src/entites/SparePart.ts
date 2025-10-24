import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { AllEntities } from "./AllEntities";
import { Prixod } from "./Prixod";
import { Brand } from "./Brand";



@Entity({name:"spare_parts"})
export class SparePart extends AllEntities{

  @Column()
  code:string

  @Column({name:"orig_code"})
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

  @Column({nullable:true})
  barcode:string

  @Column({nullable:true})
  row:string

  @Column({nullable:true})
  column:string

  @ManyToOne(() => Brand, (brand) => brand.spareParts)
  @JoinColumn() // This will create a foreign key in the Brand table
  brand: Brand;

  @ManyToOne(() => Prixod, (prixod) =>prixod.spareParts) // specify inverse side as a second parameter
  prixod: Prixod

  

}