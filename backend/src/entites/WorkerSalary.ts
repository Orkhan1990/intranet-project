import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CardJob } from "./CardJob";
import { Card } from "./Card";
import { AllEntities } from "./AllEntities";
import { User } from "./User";

@Entity({ name: "worker_salaries" })
export class WorkerSalary extends AllEntities {

  @ManyToOne(() => User, (user) => user.workerSalaries, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "workerId" })
  worker: User;

  @Column({ nullable: true })
  workerId: number;

  @ManyToOne(() => Card, (card) => card.workerSalaries, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "cardId" })
  card: Card;

  @Column()
  cardId: number;

  @ManyToOne(() => CardJob, (job) => job.workerSalaries, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "cardJobId" })
  cardJob: CardJob;

  @Column()
  cardJobId: number;

  @Column({ type: "float" })
  amount: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: Date;
}
