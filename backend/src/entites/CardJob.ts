import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AllEntities } from "./AllEntities";
import { CardWorkerJob } from "./CardWorkerJob";
import { Card } from "./Card";



@Entity({name:"card_jobs"})


export class CardJob extends AllEntities{


@Column()
code:string

@Column()
name:string

@Column({nullable:true})
av:number

@Column({nullable:true})
price:number

@Column()
discount:number

@Column()
oil:string

@OneToMany(() => CardWorkerJob, (worker) => worker.cardJob)
    workers:CardWorkerJob[]

    @ManyToOne(() => Card, (card) => card.cardJobs)
    card:Card;
}




