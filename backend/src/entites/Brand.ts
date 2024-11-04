import { Column, Entity, OneToOne } from 'typeorm';
import { AllEntities } from './AllEntities';
import { Warehouse } from './Warehouse';


@Entity({name:"brands"})
export class Brand extends AllEntities{
    
@Column({nullable:false,unique:true})
name:string

@OneToOne(() => Warehouse, warehouse => warehouse.brand)
warehouse: Warehouse;
}