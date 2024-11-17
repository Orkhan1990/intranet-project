import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { AllEntities } from "./AllEntities";
import { User } from "./User";
import { Card } from "./Card";

@Entity({ name: "card_problems" })
export class CardProblem extends AllEntities {
  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user.cardProblems)
  @JoinTable() // This will create a junction table
  serviceWorkers: User[];

  @ManyToOne(() =>Card, (card) => card.cardProblem)
  card:Card;
}
