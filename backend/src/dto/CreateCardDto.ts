// src/dto/CreateCardDto.ts
export interface CreateJobWorkerDto {
  workerId: number | string;
  workerAv: number | string;
}

export interface CreateCardJobDto {
  code?: string;
  name?: string;
  av?: number | string;
  price?: number | string;
  discount?: number | string;
  oil?: string;
  jobWorkers?: CreateJobWorkerDto[];
}

export interface CreateProblemDto {
  description: string;
  serviceWorkers: (number | string)[];
}

export interface CreateExpenseDto {
  description: string;
  price: number | string;
}

export interface CreateCardDto {
  clientId: number | string;
  type: string;
  manufactured?: string;
  model?: string;
  sassi?: string;
  carNumber?: string;
  produceDate?: string;
  km?: string;
  qostNumber?: string;
  paymentType?: string;
  nds?: boolean;
  repairAgain?: boolean;
  servisInfo?: boolean;
  comments?: string;
  recommendation?: string;
  problems?: CreateProblemDto[];
  jobs?: CreateCardJobDto[];
  expences?: CreateExpenseDto[]; // note spelling same as frontend
  userId?: number | string; // who creates the card (optional)
}
