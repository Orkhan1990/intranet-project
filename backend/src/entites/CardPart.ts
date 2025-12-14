import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AllEntities } from "./AllEntities";
import { SparePart } from "./SparePart";
import { Card } from "./Card";

@Entity({ name: "card_parts" })
export class CardPart extends AllEntities {
  @Column({ name: "part_name" })
  partName: string;

  @Column()
  code: string;

  @Column({ type: "float", nullable: true })
  discount: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  @Column({ type: "double", nullable: true, name: "sold_price" })
  soldPrice: number;

  @Column({ type: "double", nullable: true, name: "net_price" })
  netPrice: number;

  @Column({ type: "double", nullable: true })
  count: number;

  @ManyToOne(() => SparePart, (sp) => sp.cardParts, { eager: true })
  @JoinColumn({ name: "spare_part_id" })
  sparePart: SparePart;

  @ManyToOne(() => Card, (card) => card.cardParts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "card_id" })
  card: Card;

  @Column({ name: "card_id" })
  cardId: number;
}
