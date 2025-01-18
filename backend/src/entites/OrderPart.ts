import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { AllEntities } from "./AllEntities";
import { Order } from "./Order";




@Entity({name:"order_parts"})
export class OrderPart extends AllEntities{

    @Column({name:"orig_code",nullable:true})
    origCode:string;

    @Column({nullable:true})
    count:number;

    @Column({name:"check_in_stock",default:false})
    checkInStock:boolean;

    @Column({name:"stock_quantity",nullable:true})
    stockQuantity:number;


    @Column({name:"part_name",nullable:true})
    partName:string;
    

    @ManyToOne(()=>Order,(order)=>order.orderParts)
    order:Order
}