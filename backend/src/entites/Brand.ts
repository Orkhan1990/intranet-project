import { Column, Entity, ManyToOne, OneToMany} from 'typeorm';
import { AllEntities } from './AllEntities';
import { SparePart} from './SparePart';


@Entity({name:"brands"})
export class Brand extends AllEntities{
    
@Column({nullable:false,unique:true})
name:string

@OneToMany(() => SparePart, sparePart => sparePart.brand)
spareParts: SparePart[];
}