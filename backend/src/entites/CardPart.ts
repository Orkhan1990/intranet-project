import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AllEntities } from "./AllEntities";
import { SparePart } from "./SparePart";
import { Card } from "./Card";

@Entity({ name: "card_parts" })
export class CardPart extends AllEntities {
  @Column({ name: "part_name" })
  partName: string;

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

  @OneToMany(() => SparePart, (sparePart) => sparePart.cardPart)
  spareParts: SparePart[];

  @ManyToOne(() => Card, (card) => card.cardParts)
   @JoinColumn()
  card: Card;
}
