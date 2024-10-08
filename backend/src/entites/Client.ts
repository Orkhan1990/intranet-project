import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AllEntities } from "./AllEntities";
import { User } from "./User";
import { NewCard } from "./NewCard";


@Entity({name:"clients"})
export class Client extends AllEntities{

    @Column({unique:true})
     companyName:string

     
    @Column()
    companyRepresentative:string

    @Column()
    phoneNumber:string

    @Column()
    email:string

    @Column()
    address:string

    @Column()
    requisite:string

    @Column()
    voen:string

    @Column()
    contractNumber:string

    @Column()
    contractDate:string

    @Column()
    approver:string

    @Column({
        nullable:true
    })
    oneCCode:string


    @Column({default:"customer"})
    type:string


    @Column({default:"phisical"})
    typeOfStatus:string

    @Column({nullable:true})
    av:number

    @Column({nullable:true})
    partsDiscount:number;

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.clients)
    @JoinColumn({ name: "userId" })
    user: User

    @OneToMany(() => NewCard, (newCard) => newCard.client)
    newCards: NewCard[]
    
   
}
