import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AllEntities } from "./AllEntities";
import { Client } from "./Client";
import { CardProblem } from "./CardProblem";
import { CardJob } from "./CardJob";
import { CardPart } from "./CardPart";

@Entity({ name: "cards" })
export class Card extends AllEntities {
  @Column()
  type: string;

  @Column()
  manufactured: string;

  @Column()
  model: string;

  @Column()
  sassi: string;

  @Column({ name: "car_number" })
  carNumber: string;

  @Column({ name: "produce_date" })
  produceDate: string;

  @Column()
  km: string;

  @Column({ name: "qost_number" })
  qostNumber: string;

  @Column({ name: "payment_type" })
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

  @Column({ type: "float", default: 0, name: "parts_total_price" })
  partsTotalPrice: number;

  @Column({ type: "float", default: 0, name: "work_sum" })
  workSum: number;

  @Column({ type: "float", default: 0, name: "parts_sum_own" })
  partsSumOwn: number;

  @Column({ type: "float", default: 0, name: "work_sum_own" })
  workSumOwn: number;

  @ManyToOne(() => Client, (client) => client.cards)
  client: Client;

  @Column()
  clientId: number;

  @OneToMany(() => CardProblem, (cardProblem) => cardProblem.card, {
    cascade: true,
  })
  cardProblems: CardProblem[];

  @OneToMany(() => CardJob, (cardJob) => cardJob.card, { cascade: true })
  cardJobs: CardJob[];

  @OneToMany(() => CardPart, (cardPart) => cardPart.card, { cascade: true })
  cardParts: CardPart[];
}
