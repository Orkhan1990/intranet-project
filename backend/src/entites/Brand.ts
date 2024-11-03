import { Column, Entity } from 'typeorm';
import { AllEntities } from './AllEntities';


@Entity({name:"brands"})
export class Brand extends AllEntities{
    
@Column({nullable:false,unique:true})
name:string
}