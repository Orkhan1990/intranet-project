import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { AllEntities } from "./AllEntities";
import { WarehouseParts } from "./WarehouseParts";




@Entity({name:"warehouses"})
export class Warehouse extends AllEntities{

   @Column()
    invoice:string

    @Column()
    market:string

    @Column()
    paymentType:string

    @Column()
    comment:string

    @Column({nullable:true})
    message:string

    @OneToOne(() => WarehouseParts, (item) => item.warehouse) // specify inverse side as a second parameter
    @JoinColumn()
    warehouseParts: WarehouseParts
}