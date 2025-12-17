import { Column, Entity, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { AllEntities } from "./AllEntities";
import { Card } from "./Card";
import { User } from "./User";

@Entity({ name: "card_problems" })
export class CardProblem extends AllEntities {

  @Column()
  description: string;

 

  @ManyToOne(() => Card, (card) => card.cardProblems, { onDelete: "CASCADE" })
  @JoinColumn({ name: "card_id" })
  card: Card;

  @Column({ name: "card_id" })
  cardId: number;

  @ManyToMany(() => User, (user) => user.cardProblems,{nullable:true})
  @JoinTable({
    name: "card_problem_workers",
    joinColumn: { name: "problem_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "user_id", referencedColumnName: "id" }
  })
  serviceWorkers: User[];
}
