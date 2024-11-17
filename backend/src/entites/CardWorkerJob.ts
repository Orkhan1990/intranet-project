import { Column, Entity, ManyToOne } from 'typeorm';
import { AllEntities } from './AllEntities';
import { CardJob } from './CardJob';


@Entity({name:"card_worker_jobs"})
export class CardWorkerJob extends AllEntities{

@Column()
workerAv:string

@Column()
workerId:number

@ManyToOne(() =>CardJob, (job) => job.workers)
cardJob:CardJob
}