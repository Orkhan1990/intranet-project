import { Column, Entity} from "typeorm";
import { AllEntities } from "./AllEntities";

@Entity({ name: "account_sequence" })
export class AccountSequence extends AllEntities {
  @Column({ name: "current_value", type: "int" })
  currentValue: number;
}
