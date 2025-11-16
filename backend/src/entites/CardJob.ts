import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AllEntities } from "./AllEntities";
import { CardWorkerJob } from "./CardWorkerJob";
import { Card } from "./Card";
import { WorkerSalary } from "./WorkerSalary";

@Entity({ name: "card_jobs" })
export class CardJob extends AllEntities {
  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ type: "float", nullable: true })
  av: number;

  @Column({ type: "float", nullable: true })
  price: number;

  @Column({ type: "float", nullable: true })
  discount: number;

  @Column({ nullable: true })
  oil: string;

  @OneToMany(() => CardWorkerJob, (worker) => worker.cardJob, { cascade: true })
  workers: CardWorkerJob[];

  @ManyToOne(() => Card, (card) => card.cardJobs)
  @JoinColumn({ name: "card_id" })
  card: Card;

  @Column({ name: "card_id" })
  cardId: number;

  @OneToMany(() => WorkerSalary, (ws) => ws.cardJob)
  workerSalaries: WorkerSalary[];
}
