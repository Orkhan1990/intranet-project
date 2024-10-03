import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AllEntities } from "./AllEntities";
import { Client } from "./Client";
import { NewCardProblems } from "./NewCardProblems";
import { NewCardJobs } from "./NewCardJobs";

@Entity({name:"newCards"})

export class NewCard extends AllEntities{
   
    @Column()
    type:string;

    @Column()
    manufactured:string;

    @Column()
    model:string;

    @Column()
    sassi:string;

    @Column()
    carNumber:string;

    @Column()
    produceDate:string

    @Column()
    km:string;

    @Column()
    qostNumber:string;

    @Column()
    paymentType:string;

    @Column({default:false})
    nds: boolean;

    @Column({default:false})
    repairAgain: boolean;

    @Column({default:false})
    servisInfo: boolean;

    @Column({nullable:true})
    comments:string;

    @Column({default:true})
    recommendation:string;

    
    @ManyToOne(() => Client, (client) => client.newCards)
    client: Client
    
    @Column()
    clientId:number;

    @OneToMany(()=>NewCardProblems,(newCardProblem)=>newCardProblem.newCard,{cascade:true})
    newCardProblems:NewCardProblems[]

    @OneToMany(()=>NewCardJobs,(newCardjob)=>newCardjob.newCard,{cascade:true})
    newCardJobs:NewCardJobs[]
}