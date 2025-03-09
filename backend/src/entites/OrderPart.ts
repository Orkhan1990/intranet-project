import { Column, Entity, ManyToOne} from "typeorm";
import { AllEntities } from "./AllEntities";
import { Order } from "./Order";




@Entity({name:"order_parts"})
export class OrderPart extends AllEntities{

    @Column({name:"orig_code",nullable:true})
    origCode:string;

    @Column({nullable:true})
    count:number;

    @Column({ name: "order_type",nullable:true })
    orderType: string;
    
    @Column({name:"price",nullable:true})
    price:number;

    @Column({name:"total_price",nullable:true})
    totalPrice:number;

    @Column({name:"transport",nullable:true})
    transport:number;

    @Column({name:"sip_price",nullable:true})
    sipPrice:number;

    @Column({name:"unit_sip_price",nullable:true})
    unitSipPrice:number;

    @Column({name:"percent",nullable:true})
    percent:number;

    @Column({name:"profit",nullable:true})
    profit:number;

    @Column({name:"sell_price",nullable:true})
    sellPrice:number;

    @Column({name:"unit_sell_price",nullable:true})
    unitSellPrice:number;

    @Column({name:"stock_quantity",nullable:true})
    stockQuantity:number;

    @Column({name:"part_name",nullable:true})
    partName:string;
    
    @ManyToOne(()=>Order,(order)=>order.orderParts)
    order:Order
}