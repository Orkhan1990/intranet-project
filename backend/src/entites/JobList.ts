import { Entity, Column } from "typeorm";
import { AllEntities } from "./AllEntities";

@Entity("jobs_list")
export class JobList extends AllEntities {


  @Column({ type: "varchar", length: 50, unique: true })
  code: string; // Məsələn: Y1

  @Column({ type: "varchar", length: 255 })
  name: string; // Məsələn: "Yağın dəyişilməsi"

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  av: number; // Məsələn: 0.4

  @Column({ type: "boolean", default: true })
  isActive: boolean; // Job aktivdirsə dropdown-da görünsün

}
