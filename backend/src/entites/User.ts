import { Entity, Column, OneToMany, OneToOne, JoinColumn} from "typeorm"
import { AllEntities } from "./AllEntities"
import { UserRole } from "../enums/userRole"
import { Client } from "./Client"
import { CardProblem} from "./CardProblem"
import { Invoice} from "./Invoice"
import { CardWorkerJob } from "./CardWorkerJob"
import { Order } from "./Order"
import { OrderHistory } from "./OrderHistory"

@Entity({name:"users"})
export class User extends AllEntities {
   

    @Column({
       unique:true
    })
    userName: string

    @Column({
        nullable:true
    })
    firstName: string

    @Column({
        nullable:true
    })
    lastName: string

    @Column({
        unique:true
    })
    email: string

    @Column({
        default:UserRole.ServiceUser
    })
    userRole: UserRole

    @Column()
    password: string

    @OneToMany(() => Client, (client) => client.user)
    clients: Client[]

    @OneToMany(() => CardProblem, (cardProblem) => cardProblem.serviceWorkers)
    cardProblems: CardProblem[];

    @OneToOne(() => CardWorkerJob)
    @JoinColumn()
    cardWorkerJob: CardWorkerJob

    @OneToMany(()=>Invoice,(warehouse)=>warehouse.user)
    invoices:Invoice[];

    @OneToMany(()=>Order,order=>order.user)
    orders:Order[];

    @OneToMany(()=>OrderHistory,(history)=>history.user)
    histories:OrderHistory[];
}