import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AllEntities } from "./AllEntities";
import { Prixod } from "./Prixod";
import { Brand } from "./Brand";
import { CardPart } from "./CardPart";

@Entity({ name: "spare_parts" })
export class SparePart extends AllEntities {
  @Column()
  code: string;

  @Column({ name: "orig_code" })
  origCode: string;

  @Column()
  name: string;

  @Column()
  liquidity: string;

  @Column()
  count: number;

  @Column()
  price: number;

  @Column({ name: "sell_price" })
  sellPrice: number;

  @Column({ nullable: true })
  barcode: string;

  @Column({ nullable: true })
  row: string;

  @Column({ nullable: true })
  column: string;

  // 🔹 Brand relation
  @ManyToOne(() => Brand, (brand) => brand.spareParts, { nullable: true })
  @JoinColumn({ name: "brand_id" })
  brand: Brand;

  // 🔹 Prixod relation
  @ManyToOne(() => Prixod, (prixod) => prixod.spareParts, { nullable: true })
  @JoinColumn({ name: "prixod_id" })
  prixod: Prixod;

  @Column({ name: "prixod_id", nullable: true })
  prixodId: number;

  // 🔹 Card parts relation
  @OneToMany(() => CardPart, (cardPart) => cardPart.sparePart)
  cardParts: CardPart[];
}
