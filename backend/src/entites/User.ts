import { Entity, Column, OneToMany, OneToOne, JoinColumn} from "typeorm"
import { AllEntities } from "./AllEntities"
import { UserRole } from "../enums/userRole"
import { Client } from "./Client"
import { CardProblem} from "./CardProblem"
import { Prixod} from "./Prixod"
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
        nullable:true,
        name:"first_name"
    })
    firstName: string

    @Column({
        nullable:true,
        name:"last_name"
    })
    lastName: string

    @Column({
        unique:true
    })
    email: string

    @Column({
        nullable:true
    })
    phone: string;
    

    @Column({
        nullable:true
    })
    address: string;

    @Column({
        default:false,
    })
    isWorker: boolean;

     @Column({
        type:"float",
        nullable:true
    })
    percent: number;

    @Column({
        default:UserRole.ServiceUser,
        name:"user_role"
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

    @OneToMany(()=>Prixod,(prixod)=>prixod.user)
    prixods:Prixod[];

    @OneToMany(()=>Order,order=>order.user)
    orders:Order[];
    
    @OneToMany(() => Order, (order) => order.responsibleUser)
    responsibleUserOrders: Order[];

    @OneToMany(()=>OrderHistory,(history)=>history.user)
    histories:OrderHistory[];

   
  
}