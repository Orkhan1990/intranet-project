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
    default: 0,
  })
  price: string;

  @Column({
    name: "total_price",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  totalPrice: string;

  @Column({
    name: "transport_value",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  transportValue: string;

  @Column({
    name: "transport",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  transport: string;

  @Column({
    name: "sip_price",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  sipPrice: string;

  @Column({
    name: "unit_sip_price",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  unitSipPrice: string;

  @Column({
    name: "percent",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  percent: string;

  @Column({
    name: "profit",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  profit: string;

  @Column({
    name: "sell_price",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  sellPrice: string;

  @Column({
    name: "unit_sell_price",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  unitSellPrice: string;

  @Column({ name: "stock_quantity", nullable: true, default: 0 })
  stockQuantity: string;

  @Column({ name: "part_name", nullable: true, default: 0 })
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
    default: 0,
  })
  priceExw: string;

  @Column({
    name: "price_exw_no_discount",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  priceExwNoDiscount: string;

  @Column({
    name: "price_without_packing",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  priceWithoutPacking: string;

  @Column({
    name: "packing",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  packing: string;

  @Column({
    name: "total_price_standart",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  totalPriceStandart: string;

  @Column({
    name: "total_price_man_value",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  totalPriceManValue: string;

  @Column({
    name: "total_price_man",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  totalPriceMan: string;

  @Column({
    name: "netto_by_unit",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  nettoByUnit: string;

  @Column({
    name: "total_netto",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  totalNetto: string;

  @Column({
    name: "transport_man_value",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  transportManValue: string;

  @Column({
    name: "transport_man",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  transportMan: string;

  @Column({
    name: "cip_price",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  cipPrice: string;

  @Column({
    name: "tax_value",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  taxValue: string;

  @Column({
    name: "tax",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  tax: string;

  @Column({
    name: "accessory_cost",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  accessoryCost: string;

  @Column({
    name: "accessory_cost_value",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  accessoryCostValue: string;

  @Column({
    name: "declaration_value",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  declarationValue: string;

  @Column({
    name: "declaration",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  declaration: string;

  @Column({
    name: "ddp_price",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  ddpPrice: string;

  @Column({
    name: "unit_ddp_price",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  unitDdpPrice: string;

  @Column({
    name: "percentage_value",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  percentageValue: string;

  @Column({
    name: "percentage",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  percentage: string;

  @Column({
    name: "sell_price_client_stock",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  sellPriceClientStock: string;

  @Column({
    name: "rabatgrup_ind",
    type: "int",
    nullable: true,
    default: 0,
  })
  rabatgrupInd: number;

  @Column({
    name: "total_sell_price_client_ordered",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  totalSellPriceClientOrdered: string;

  @Column({
    name: "sell_price_unit_which_in_stock",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  sellPriceUnitWhichInStock: string;

  @Column({
    name: "reserved",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  reserved: string;

  @Column({
    name: "total_sell_price_which_in_stock",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  totalSellPriceWhichInStock: string;

  @Column({
    name: "total_sell_price_ordered_which_in_stock",
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  totalSellPriceOrderedWhichInStock: string;

  @ManyToOne(() => Order, (order) => order.orderParts)
  order: Order;

  @OneToMany(() => SupplierOrderParts, (supplier) => supplier.orderPart)
  supplierOrderPart: SupplierOrderParts[];
}
