import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AllEntities } from "./AllEntities";
import { Client } from "./Client";
import { OrderPart } from "./OrderPart";
import { User } from "./User";
import { OrderHistory } from "./OrderHistory";
import { OrderStage, OrderStatus } from "../enums/allEnums";


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
    default:OrderStatus.Open
  })
  status = OrderStatus.Open;

  @Column({
    type: "enum",
    enum: OrderStage,
    enumName: "order_stage",
    default:OrderStage.Created
  })
  stage = OrderStage.Created;

  @Column()
  comment: string;

  @Column({ default: false })
  oil: boolean;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Client, (client) => client.orders)
  client: Client;

  @OneToMany(() => OrderPart, (orderPart) => orderPart.order)
  orderParts: OrderPart[];

  @OneToMany(() => OrderHistory, (orderHistory) => orderHistory.order)
  orderHistory: OrderHistory[];

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

  @Column({name:"responsible_date"})
  responsibleDate:Date;

  @Column({name:"responsible_begin_date"})
  responsibleBeginDate:Date
}
