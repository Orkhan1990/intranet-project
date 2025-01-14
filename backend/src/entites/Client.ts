import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AllEntities } from "./AllEntities";
import { User } from "./User";
import { Card} from "./Card";
import { Order } from "./Order";


@Entity({name:"clients"})
export class Client extends AllEntities{

    @Column({unique:true,name:"company_name"})
     companyName:string

     
    @Column({name:"company_representative"})
    companyRepresentative:string

    @Column({name:"phone_number"})
    phoneNumber:string

    @Column()
    email:string

    @Column()
    address:string

    @Column()
    requisite:string

    @Column()
    voen:string

    @Column({name:"contract_number"})
    contractNumber:string

    @Column({name:"contract_date"})
    contractDate:string

    @Column()
    approver:string

    @Column({
        nullable:true
    })
    oneCCode:string


    @Column({default:"customer"})
    type:string


    @Column({default:"phisical",name:"type_of_status"})
    typeOfStatus:string

    @Column({nullable:true})
    av:number

    @Column({nullable:true,name:"parts_discount"})
    partsDiscount:number;

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.clients)
    @JoinColumn({ name: "userId" })
    user: User

    @OneToMany(() =>Card, (card) => card.client)
    cards:Card[]

    @OneToMany(()=>Order,(order=>order.client))
    orders:Order[]
    
   
}
