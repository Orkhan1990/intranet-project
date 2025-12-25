import { Column, Entity} from "typeorm";
import { AllEntities } from "./AllEntities";

@Entity({ name: "repair_sequence" })
export class RepairSequence extends AllEntities {
  @Column({ name: "current_value", type: "int" })
  currentValue: number;
}