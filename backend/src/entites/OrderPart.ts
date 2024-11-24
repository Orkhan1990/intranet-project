import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { AllEntities } from "./AllEntities";
import { Order } from "./Order";




@Entity({name:"order_parts"})
export class OrderPart extends AllEntities{

    @Column({name:"part_number"})
    partNumber:string;

    @Column()
    count:number;

    @Column({name:"part_name"})
    partName:string;
    

    @ManyToOne(()=>Order,(order)=>order.orderParts)
    order:Order
}