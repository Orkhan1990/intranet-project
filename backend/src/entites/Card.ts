import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AllEntities } from "./AllEntities";
import { Client } from "./Client";
import { CardProblem} from "./CardProblem";
import { CardJob} from "./CardJob";

@Entity({name:"cards"})

export class Card extends AllEntities{
   
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

    @OneToMany(()=>CardProblem,(cardProblem)=>cardProblem.card)
    cardProblem:CardProblem[]

    @OneToMany(()=>CardJob,(cardjob)=>cardjob.card)
    cardJobs:CardJob[]
}