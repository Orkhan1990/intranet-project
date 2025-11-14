import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { AllEntities } from "./AllEntities";
import { CardJob } from "./CardJob";
import { User } from "./User";

@Entity({ name: "card_worker_jobs" })
export class CardWorkerJob extends AllEntities {
  @Column({ name: "worker_av", type: "decimal", precision: 10, scale: 2, default: 0 })
  workerAv: number;

  // 🔹 Relation to CardJob (Many workers can belong to one job)
  @ManyToOne(() => CardJob, (job) => job.workers, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "card_job_id" })
  cardJob: CardJob;

  // 🔹 Relation to User (Each worker belongs to a User)
  @ManyToOne(() => User, (user) => user.cardWorkerJobs, {
    eager: true, // optional, auto-load user info
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "worker_id" })
  user: User;
}
