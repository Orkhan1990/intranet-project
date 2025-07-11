import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AllEntities } from "./AllEntities";
import { User } from "./User";
import { Order } from "./Order";
import { OrderStage, OrderStep } from "../enums/allEnums";
import { SupplierOrderHistory } from "./SuppliersOrderHistory";



@Entity({name:"order_history"})
export class OrderHistory extends AllEntities{
    @Column({
         type: "enum",
            enum: OrderStep,
            enumName: "order_step"
        })
    step:OrderStep

    @Column({default:false})
    confirm:boolean;
  
    @Column({default:false,name:"show_hide"})
    showHide:boolean;

      
    @Column({default:false,name:"show_result"})
    showResult:boolean;
    
    @Column({nullable:true})
    message:string;

    @Column({nullable:true})
    reject:string

    @Column({nullable:true})
    file:string
     
    @Column({nullable:true})
    date:Date;

    @ManyToOne(()=>User,(user)=>user.histories)
    user:User;


    @ManyToOne(()=>Order,(order)=>order.orderHistory)
    order:Order

    @OneToMany(()=>SupplierOrderHistory,(item)=>item.orderHistory)
    supplierOrderHistories:SupplierOrderHistory[];

}