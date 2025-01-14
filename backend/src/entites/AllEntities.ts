import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class AllEntities extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({name:"created_at"})
  createdAt: Date;

  @UpdateDateColumn({name:"updated_at"})
  updatedAt: Date;
}
