import { Column, Entity, OneToOne } from 'typeorm';
import { AllEntities } from './AllEntities';
import { WarehouseParts } from './WarehouseParts';


@Entity({name:"brands"})
export class Brand extends AllEntities{
    
@Column({nullable:false,unique:true})
name:string

@OneToOne(() => WarehouseParts, warehouseParts => warehouseParts.brand)
warehouseParts: WarehouseParts;
}