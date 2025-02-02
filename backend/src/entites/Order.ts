import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { AllEntities } from "./AllEntities";
import { Client } from "./Client";
import { OrderPart } from "./OrderPart";
import { User } from "./User";
import { OrderHistory } from "./OrderHistory";
import { OrderStage, OrderStatus } from "../enums/allEnums";
import { Supplier } from "./Supplier";

@Entity({ name: "orders" })
export class Order extends AllEntities {
  @Column({ nullable: true })
  project: string;

  @Column({ nullable: true, name: "card_number" })
  cardNumber: string;

  @Column({ name: "order_type" })
  orderType: string;

  @Column()
  manufacturer: string;

  @Column()
  model: string;


  @Column({ name: "chassis_number" })
  chassisNumber: string;

  @Column({ name: "engine_number" })
  engineNumber: string;

  @Column({ name: "produce_year" })
  produceYear: string;

  @Column()
  km: string;

  @Column({default:false})
  isExcellFile: boolean;

  @Column({ name: "vehicle_number" })
  vehicleNumber: string;

  @Column({ name: "payment_type" })
  paymentType: string;

  @Column({ name: "delivering" })
  delivering: string;

  @Column({ name: "delivering_type" })
  deliveringType: string;

  @Column({ name: "initial_payment" })
  initialPayment: string;

  @Column({
    type: "enum",
    enum: OrderStatus,
    enumName: "order_status",
    default: OrderStatus.Open,
  })
  status:OrderStatus;

  @Column()
  comment: string;

  @Column({ default: false })
  oil: boolean;

  @Column({
    type: "enum",
    enum: OrderStage,
    enumName: "order_stage",
    default: OrderStage.Created,
  })
  stage: OrderStage;

  @Column({ default: false })
  confirm: boolean;

  @Column({ name: "confirm_date", nullable: true })
  confirmDate: Date;

  @Column({default:false})
  accept:boolean;

  @Column({name:"accept_date",nullable:true})
  acceptDate:Date;

  @Column({name:"accept_message",nullable:true})
  acceptMessage:string;

  @Column({name:"reject_message",nullable:true})
  rejectMessage:string;

  @Column({name:"is_responsible",default:false})
  isResponsible:boolean;

  
  @Column({name:"responsible_date",nullable:true})
  responsibleDate:Date;

  @Column({name:"responsible_begin_date",nullable:true})
  responsibleBeginDate:Date;

  @Column({name:"responsible_message",nullable:true})
  responsibleMessage:string;
  
  @Column({name:"is_request_suplier",default:false})
  isBeginRequestSupplier:boolean;

  @Column({name:"initial_message_to_supplier",nullable:true})
  firstMessageToSupplier:string;

  @Column({name:"second_message_to_supplier",nullable:true})
  secondMessageToSupplier:string


  @ManyToMany(()=>Supplier)
  @JoinTable()
  suppliers:Supplier[];

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Client, (client) => client.orders)
  client: Client;

  @OneToMany(() => OrderPart, (orderPart) => orderPart.order)
  orderParts: OrderPart[];

  @OneToMany(() => OrderHistory, (orderHistory) => orderHistory.order)
  orderHistory: OrderHistory[];

  @ManyToOne(() => User, (user) => user.responsibleUserOrders, { nullable: true })
  responsibleUser: User;
}
