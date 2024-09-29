import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { AllEntities } from "./AllEntities";
import { User } from "./User";
import { NewCard } from "./NewCard";

@Entity({ name: "newCardProblems" })
export class NewCardProblems extends AllEntities {
  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user.newCardproblem)
  @JoinTable() // This will create a junction table
  serviceWorkers: User[];

  @ManyToOne(() => NewCard, (newCard) => newCard.newCardProblems)
  newCard: NewCard;
}
