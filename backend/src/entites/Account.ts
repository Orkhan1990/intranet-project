import { Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { AllEntities } from "./AllEntities";
import { Card } from "./Card";

@Entity({ name: "accounts" })
export class Account extends AllEntities {

  @Column({
  name: "account_id",
  type: "int",
})
accountID: number;

  @Column({ type: "date", name: "date" })
  date: Date;

  @Column({ name: "send_with", nullable: true })
  sendWith: string;

  @Column({ type: "timestamp", name: "send_with_date", nullable: true })
  sendWithDate: Date;

  @Column({ name: "account_receive", nullable: true })
  accountReceive: string;

  @Column({ name: "vhfnum", nullable: true })
  vhfNum: string;

  @Column({ type: "timestamp", name: "vhf_date", nullable: true })
  vhfDate: Date;

  @Column({ name: "otk", nullable: true })
  otk: number;

  // 👇 OWNER tərəf (foreign key burda olacaq)
  @OneToOne(() => Card, (card) => card.account, { onDelete: "CASCADE" })
  @JoinColumn({ name: "card_id" })
  card: Card;
}
