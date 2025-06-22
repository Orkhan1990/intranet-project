import { Column, Entity } from "typeorm";
import { AllEntities } from "./AllEntities";
import { Type } from "../enums/allEnums";

@Entity({name:"price_lists"})
export class PriceList extends AllEntities{

     @Column()
     name:string;

     @Column()
     nameDe:string;

     @Column()
     kod:string;

     @Column()
     origkod:string;

     @Column({name:"price",type:"decimal",precision:10,scale:2,nullable:true})
     price:string;

     @Column({name:"price",type:"decimal",precision:10,scale:2,nullable:true})
     quantity:string;

     @Column({name:"price",type:"decimal",precision:10,scale:2,nullable:true})
     weight:string;

     @Column()
     rabatgrup:number;
     

        @Column({
              type: "enum",
                 enum:Type,
                 enumName: "type"
             })
     type:Type




}