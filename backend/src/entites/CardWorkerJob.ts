import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { AllEntities } from "./AllEntities";
import { CardJob } from "./CardJob";
import { User } from "./User";

@Entity({ name: "card_worker_jobs" })
export class CardWorkerJob extends AllEntities {

  // İşçinin bu işdə işlədiyi AV
  @Column({
    name: "worker_av",
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,      // ALWAYS DEFAULT
  })
  workerAv: number;

  // İşçinin maaş faizi
  @Column({
    type: "float",
    default: 0,      // ALWAYS DEFAULT
  })
  salaryPercent: number;

  // Hesablanmış maaş
  @Column({
    type: "decimal",
    precision: 12,
    scale: 2,
    default: 0,      // ALWAYS DEFAULT
  })
  earnedSalary: number;

  // 🔹 Relation to CardJob
  @ManyToOne(() => CardJob, (job) => job.workers, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "card_job_id" })
  cardJob: CardJob;

  @Column({
    name: "card_job_id",
    type: "int",
  })
  cardJobId: number;

  // 🔹 Relation to User
  @ManyToOne(() => User, (user) => user.cardWorkerJobs, {
    eager: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "worker_id" })
  user: User | null;

  @Column({
    name: "worker_id",
    type: "int",
    nullable: true,   // ALWAYS NULLABLE WHEN SET NULL
    default: null,
  })
  workerId: number | null;
}
