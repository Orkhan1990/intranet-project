import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AllEntities } from "./AllEntities";
import { Supplier } from "./Supplier";
import { OrderPart } from "./OrderPart";



  @Entity({name:"supplier_orderParts"})
export class SupplierOrderParts extends AllEntities{

    @ManyToOne(()=>Supplier,(supplier)=>supplier.supplierOrderPart)
    @JoinColumn({name:"supplier_id"})
    supplier:Supplier;
    
    @ManyToOne(()=>OrderPart,(orderPart)=>orderPart.supplierOrderPart)
    @JoinColumn({name:"order_part_id"})
    orderPart:OrderPart;
    
    @Column({nullable:true})
    date:Date;
    @Column({name:"orig_code",nullable:true})
    origCode:string;

    @Column({nullable:true})
    count:number;

    @Column({ name: "delivering",nullable:true })
    delivering: string;
    
    @Column({name:"price",type:"decimal",precision:10,scale:2,nullable:true})
    price:string;

    @Column({name:"total_price",type:"decimal",precision:10,scale:2,nullable:true})
    totalPrice:string;

    @Column({name:"transport",type:"decimal",precision:10,scale:2,nullable:true})
    transport:string;

    @Column({name:"sip_price",type:"decimal",precision:10,scale:2,nullable:true})
    sipPrice:string;

    @Column({name:"unit_sip_price",type:"decimal",precision:10,scale:2,nullable:true})
    unitSipPrice:string;

    @Column({name:"percent",type:"decimal",precision:10,scale:2,nullable:true})
    percent:string;

    @Column({name:"profit",type:"decimal",precision:10,scale:2,nullable:true})
    profit:string;

    @Column({name:"sell_price",type:"decimal",precision:10,scale:2,nullable:true})
    sellPrice:string;

    @Column({name:"unit_sell_price",type:"decimal",precision:10,scale:2,nullable:true})
    unitSellPrice:string;

    @Column({name:"stock_quantity",nullable:true})
    stockQuantity:string;

    @Column({name:"part_name",nullable:true})
    partName:string;
}