import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { AllEntities } from "./AllEntities";
import { Client } from "./Client";
import { CardProblem } from "./CardProblem";
import { CardJob } from "./CardJob";
import { CardPart } from "./CardPart";
import { User } from "./User";
import { CardExpense } from "./CardExpense";
import { Brand } from "./Brand";
import { Account } from "./Account";
import { Repair } from "./Repair";

@Entity({ name: "cards" })
export class Card extends AllEntities {
  @Column({ name: "type", nullable: true })
  type: string;

  @Column({ name: "manufactured", nullable: true })
  manufactured: string;

  @Column({ name: "model", nullable: true })
  model: string;

  @Column({ default: true, name: "is_open" })
  isOpen: boolean;

  @Column({ type: "double", default: 0, name: "parts_total_price" })
  partsTotalPrice: number;

  @Column({ type: "double", default: 0, name: "work_sum" })
  workSum: number;

  @Column({ type: "double", default: 0, name: "parts_sum_own" })
  partsSumOwn: number;

  @Column({ type: "double", default: 0, name: "work_sum_own" })
  workSumOwn: number;

  @Column({ type: "double", default: 0, name: "av_sum" })
  avSum: number;

  @Column({ default: false, name: "is_way_out" })
  isWayOut: boolean;

  @Column({ name: "way_out_direction", nullable: true })
  wayOutDirection: string;

  @Column({ name: "way_out_workers", default: 0 })
  wayOutWorkers: number;

  @Column({ name: "way_out_car", default: 0 })
  wayOutCar: number;

  @Column({ type: "double", name: "way_out_distance", default: 0 })
  wayOutDistance: number;

  @Column({ type: "double", name: "way_out_work_time", default: 0 })
  wayOutWorkTime: number;

  @Column({ name: "sassi", nullable: true })
  sassi: string;

  @Column({
    type: "timestamp",
    name: "open_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  openDate: Date;

  @Column({ type: "timestamp", name: "close_date", nullable: true })
  closeDate: Date | null;

  @Column({ name: "car_number", nullable: true })
  carNumber: string;

  @Column({ name: "produce_date", nullable: true })
  produceDate: string;

  @Column({ name: "km", nullable: true })
  km: string;

  @Column({ name: "qost_number", nullable: true })
  qostNumber: string;

  @Column({ name: "payment_type", nullable: true })
  paymentType: string;

  @Column({ default: false })
  nds: boolean;

  @Column({ default: false, name: "repair_again" })
  repairAgain: boolean;

  @Column({ default: false, name: "servis_info" })
  servisInfo: boolean;

  @Column({ nullable: true })
  comments: string;

  @Column({ nullable: true })
  recommendation: string;

  // Client
  @ManyToOne(() => Client, (client) => client.cards, { onDelete: "SET NULL" })
  @JoinColumn({ name: "clientId" })
  client: Client;

  @Column({ name: "clientId", nullable: true })
  clientId: number;

  // Relations
  @OneToMany(() => CardProblem, (cardProblem) => cardProblem.card, {
    cascade: true,
  })
  cardProblems: CardProblem[];

  @OneToMany(() => CardJob, (cardJob) => cardJob.card, { cascade: true })
  cardJobs: CardJob[];

  @OneToMany(() => CardPart, (cardPart) => cardPart.card, {
    cascade: true,
    eager: true,
  })
  cardParts: CardPart[];

  // User (creator / owner)
  @ManyToOne(() => User, (user) => user.cards, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "user_id", nullable: true })
  userId: number;

  // Kartı bağlayan user
  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "closed_by_user_id" })
  closedByUser: User;

  @Column({ name: "closed_by_user_id", nullable: true })
  closedByUserId: number;

  @OneToMany(() => CardExpense, (e) => e.card)
  expenses: CardExpense[];

  // Brand
  @ManyToOne(() => Brand, (brand) => brand.cards, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "brandId" })
  brand: Brand;

  @Column({ name: "brandId", nullable: true })
  brandId: number;

  @OneToOne(() => Account, (account) => account.card, { eager: true })
  account: Account;

  @OneToOne(() => Repair, (repair) => repair.card, { eager: true })
  repair: Repair;
}
