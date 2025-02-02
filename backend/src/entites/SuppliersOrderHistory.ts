import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AllEntities } from "./AllEntities";
import { Supplier } from "./Supplier";
import { OrderHistory } from "./OrderHistory";


@Entity({name:"supplier_order_history"})
export class SupplierOrderHistory extends AllEntities{

@ManyToOne(()=>Supplier,(supplier)=>supplier.supplierOrderHistories)
@JoinColumn({name:"supplier_id"})
supplier:Supplier;

@ManyToOne(()=>OrderHistory,(orderHisotry)=>orderHisotry.supplierOrderHistories)
@JoinColumn({name:"order_history_id"})
orderHistory:OrderHistory;

@Column({nullable:true})
date:Date;

@Column({nullable:true})
file:string;

}