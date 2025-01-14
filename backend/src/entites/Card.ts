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

    @Column({name:"car_number"})
    carNumber:string;

    @Column({name:"produce_date"})
    produceDate:string

    @Column()
    km:string;

    @Column({name:"qost_number"})
    qostNumber:string;

    @Column({name:"payment_type"})
    paymentType:string;

    @Column({default:false})
    nds: boolean;

    @Column({default:false,name:"repair_again"})
    repairAgain: boolean;

    @Column({default:false,name:"servis_info"})
    servisInfo: boolean;

    @Column({nullable:true})
    comments:string;

    @Column({default:true})
    recommendation:string;

    
    @ManyToOne(() => Client, (client) => client.cards)
    client: Client
    
    @Column()
    clientId:number;

    @OneToMany(()=>CardProblem,(cardProblem)=>cardProblem.card)
    cardProblem:CardProblem[]

    @OneToMany(()=>CardJob,(cardjob)=>cardjob.card)
    cardJobs:CardJob[]
}