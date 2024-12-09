import { Column, Entity, ManyToOne } from "typeorm";
import { AllEntities } from "./AllEntities";
import { User } from "./User";
import { Order } from "./Order";



@Entity({name:"order_history"})
export class OrderHistory extends AllEntities{
 

    @ManyToOne(()=>User,(user)=>user.histories)
    user:User;


    @ManyToOne(()=>Order,(order)=>order.orderHistory)
    order:Order
}