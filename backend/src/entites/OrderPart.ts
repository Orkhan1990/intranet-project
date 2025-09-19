import {
  Column,
  Decimal128,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { AllEntities } from "./AllEntities";
import { Order } from "./Order";
import { Supplier } from "./Supplier";
import { SupplierOrderParts } from "./SupplierOrderParts";

@Entity({ name: "order_parts" })
export class OrderPart extends AllEntities {
  @Column({ name: "orig_code", nullable: true })
  origCode: string;

  @Column({ nullable: true })
  count: number;

  @Column({ name: "delivering", nullable: true })
  delivering: string;

  @Column({
    name: "price",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  price: string;

  @Column({
    name: "total_price",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  totalPrice: string;

  @Column({
    name: "transport",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  transport: string;

  @Column({
    name: "sip_price",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  sipPrice: string;

  @Column({
    name: "unit_sip_price",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  unitSipPrice: string;

  @Column({
    name: "percent",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  percent: string;

  @Column({
    name: "profit",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  profit: string;

  @Column({
    name: "sell_price",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  sellPrice: string;

  @Column({
    name: "unit_sell_price",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  unitSellPrice: string;

  @Column({ name: "stock_quantity", nullable: true })
  stockQuantity: string;

  @Column({ name: "part_name", nullable: true })
  partName: string;

  @Column({ nullable: true, default: 0 })
  qtyInStock: number;

  @Column({ nullable: true, default: 0 })
  qtyForStock: number;

  @Column({ nullable: true, default: 0 })
  priceListExw: number;

  @Column({
    name: "price_exw",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  priceExw: string;

  @Column({
    name: "price_exw_no_discount",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  priceExwNoDiscount: string;

  @Column({
    name: "price_without_packing",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  priceWithoutPacking: string;

  @Column({
    name: "packing",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  packing: string;

  @Column({
    name: "total_price_standart",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  totalPriceStandart: string;

  @Column({
    name: "total_price_man",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  totalPriceMan: string;

  @Column({
    name: "netto_by_unit",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  nettoByUnit: string;

  @Column({
    name: "total_netto",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  totalNetto: string;

  @Column({
    name: "transport_man",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  transportMan: string;

  @Column({
    name: "cip_price",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  cipPrice: string;

  @Column({
    name: "tax",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  tax: string;

  @Column({
    name: "accessory_cost",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  accessoryCost: string;

  @Column({
    name: "declaration",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  declaration: string;

  @Column({
    name: "ddp_price",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  ddpPrice: string;

  @Column({
    name: "unit_ddp_price",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  unitDdpPrice: string;

  @Column({
    name: "percentage",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  percentage: string;

  @Column({
    name: "sell_price_client_stock",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  sellPriceClientStock: string;

  @Column({
    name: "rabatgrup_ind",
    type: "int",
    nullable: true,
  })
  rabatgrupInd: number;

  @Column({
    name: "total_sell_price_client_ordered",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  totalSellPriceClientOrdered: string;

  @Column({
    name: "sell_price_unit_which_in_stock",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  sellPriceUnitWhichInStock: string;

  @Column({
    name: "reserved",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  reserved: string;

  @Column({
    name: "total_sell_price_which_in_stock",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  totalSellPriceWhichInStock: string;

  @Column({
    name: "total_sell_price_ordered_which_in_stock",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  totalSellPriceOrderedWhichInStock: string;

  @ManyToOne(() => Order, (order) => order.orderParts)
  order: Order;

  @OneToMany(() => SupplierOrderParts, (supplier) => supplier.orderPart)
  supplierOrderPart: SupplierOrderParts[];
}
