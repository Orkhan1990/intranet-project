import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { AllEntities } from "./AllEntities";
import { Card } from "./Card";
import { User } from "./User";

@Entity({ name: "card_problems" })
export class CardProblem extends AllEntities {
  @Column()
  description: string;

  @ManyToOne(() => Card, (card) => card.cardProblems)
  card: Card;

   @ManyToMany(() => User, (user) => user.cardProblems)
  serviceWorkers: User[];
}