import { Entity, Column, OneToMany, OneToOne, JoinColumn} from "typeorm"
import { AllEntities } from "./AllEntities"
import { UserRole } from "../enums/userRole"
import { Client } from "./Client"
import { NewCardProblems } from "./NewCardProblems"
import { NewCardJobsWorker } from "./NewCardJobWorkers"

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

    @OneToMany(() => Client, (client) => client.user,{cascade:true})
    clients: Client[]

    @OneToMany(() => NewCardProblems, (newCardproblem) => newCardproblem.serviceWorkers,{cascade:true})
    newCardproblem: NewCardProblems[];

    @OneToOne(() => NewCardJobsWorker)
    @JoinColumn()
    workerId: NewCardJobsWorker
}