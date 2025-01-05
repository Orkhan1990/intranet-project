import { Column, Entity, ManyToOne } from "typeorm";
import { AllEntities } from "./AllEntities";
import { User } from "./User";
import { Order } from "./Order";
import { OrderStage } from "../enums/allEnums";



@Entity({name:"order_history"})
export class OrderHistory extends AllEntities{
 
   

    @ManyToOne(() => User, (user) => user.responsibleOrders,{nullable:true})
    responsibleUser: User|null=null;
  

    @Column({name:"responsible_date",nullable:true})
    responsibleDate:Date;
  
    @Column({name:"responsible_begin_date",nullable:true})
    responsibleBeginDate:Date

    @ManyToOne(()=>User,(user)=>user.histories)
    user:User;


    @ManyToOne(()=>Order,(order)=>order.orderHistory)
    order:Order
}