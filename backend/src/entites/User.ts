import { Entity, Column} from "typeorm"
import { AllEntites } from "./AllEntites"

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

    @Column()
    password: string
}