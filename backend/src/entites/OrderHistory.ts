import { Column, Entity, ManyToOne } from "typeorm";
import { AllEntities } from "./AllEntities";
import { User } from "./User";
import { Order } from "./Order";
import { OrderStage } from "../enums/allEnums";



@Entity({name:"order_history"})
export class OrderHistory extends AllEntities{
 
    @Column({
        type: "enum",
        enum: OrderStage,
        enumName: "order_stage",
        default:OrderStage.Created
      })
      stage = OrderStage.Created;

    @Column({default:false})
    confirm:boolean;
  
    @Column({name:"confirm_date"})
    confirmDate:Date;
  
    @Column()
    accept:boolean;
  
    @Column({name:"accept_date"})
    acceptDate:Date;
  
    @Column({name:"accept_message"})
    acceptMessage:string;

    @ManyToOne(() => User, (user) => user.responsibleOrders)
    responsibleUser: User;
  

    @Column({name:"responsible_date",default:new Date()})
    responsibleDate:Date;
  
    @Column({name:"responsible_begin_date",default:new Date()})
    responsibleBeginDate:Date

    @ManyToOne(()=>User,(user)=>user.histories)
    user:User;


    @ManyToOne(()=>Order,(order)=>order.orderHistory)
    order:Order
}