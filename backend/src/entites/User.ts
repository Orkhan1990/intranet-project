import { Entity, Column, OneToMany} from "typeorm"
import { AllEntites } from "./AllEntites"
import { UserRole } from "../enums/userRole"
import { Client } from "./Client"

@Entity({name:"users"})
export class User extends AllEntites {
   

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
}