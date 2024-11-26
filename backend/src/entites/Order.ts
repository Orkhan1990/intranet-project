import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AllEntities } from "./AllEntities";
import { Client } from "./Client";
import { OrderPart } from "./OrderPart";
import { User } from "./User";


@Entity({name:"orders"})
export class Order extends AllEntities{

    @Column({nullable:true})
    project:string;

    @Column({nullable:true,name:"card_number"})
    cardNumber:string;

    @Column({name:"order_type"})
    orderType:string;

    @Column()
    manufacturer:string;

    @Column()
    model:string;

    @Column({name:"chassis_number"})
    chassisNumber:string;

    @Column({name:"engine_number"})
    engineNumber:string;

    @Column({name:"produce_year"})
    produceYear:string;

    @Column()
    km:string;

    @Column({name:"vehicle_number"})
    vehicleNumber:string;

    @Column({name:"payment_type"})
    paymentType:string;

    @Column({name:"delivering"})
    delivering:string;

    
    @Column({name:"delivering_type"})
    deliveringType:string;

    @Column({name:"initial_payment"})
    initialPayment:string;


    @Column()
    comment:string;

    @Column()
    oil:boolean;


    @ManyToOne(()=>User,user=>user.orders)
    user:User

    @ManyToOne(()=>Client,(client=>client.orders))
    client:Client;

    @OneToMany(()=>OrderPart,orderPart=>orderPart.order)
     orderParts:OrderPart[]

}