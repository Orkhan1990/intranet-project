import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AllEntities } from "./AllEntities";
import { CardWorkerJob } from "./CardWorkerJob";
import { Card } from "./Card";

@Entity({ name: "card_jobs" })
export class CardJob extends AllEntities {
  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ type: "decimal", precision: 10, scale: 3, nullable: true })
  av: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  discount: number;

   @Column({ type: "decimal", precision: 10, scale: 2,   name: "discount_price", nullable: true })
  discountPrice: number;

  @Column({ nullable: true })
  oil: string;

  @OneToMany(() => CardWorkerJob, (worker) => worker.cardJob, { cascade: true })
  workers: CardWorkerJob[];

  @ManyToOne(() => Card, (card) => card.cardJobs)
  @JoinColumn({ name: "card_id" })
  card: Card;

  @Column({ name: "card_id" })
  cardId: number;

}
