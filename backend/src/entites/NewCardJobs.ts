import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AllEntities } from "./AllEntities";
import { NewCardJobsWorker } from "./NewCardJobWorkers";
import { NewCard } from "./NewCard";



@Entity({name:"newCardJobs"})


export class NewCardJobs extends AllEntities{


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

@OneToMany(() => NewCardJobsWorker, (worker) => worker.newCardJob)
    workers: NewCardJobsWorker[]

    @ManyToOne(() => NewCard, (newCard) => newCard.newCardJobs)
  newCard: NewCard;
}




