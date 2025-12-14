import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AllEntities } from "./AllEntities";
import { Client } from "./Client";
import { CardProblem } from "./CardProblem";
import { CardJob } from "./CardJob";
import { CardPart } from "./CardPart";
import { User } from "./User";
import { CardExpense } from "./CardExpense";
import { Brand } from "./Brand";

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

  @OneToMany(() => CardPart, (cardPart) => cardPart.card, { cascade: true,eager:true })
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
}
