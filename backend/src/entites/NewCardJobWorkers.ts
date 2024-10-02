import { Column, Entity, ManyToOne } from 'typeorm';
import { AllEntities } from './AllEntities';
import { NewCardJobs } from './NewCardJobs';


@Entity({name:"newCardJobsWorker"})
export class NewCardJobsWorker extends AllEntities{

@Column()
workerAv:string

@Column()
workerId:number

@ManyToOne(() => NewCardJobs, (job) => job.workers)
newCardJob: NewCardJobs
}