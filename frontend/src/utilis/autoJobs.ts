export type AutoJobConfig = {
  code: string;
  name: string;
  av: number;
  discount?: number;
  oil?: string;
};

export const AUTO_JOBS: Record<string, AutoJobConfig> = {
  Y1: {
    code: "Y1",
    name: "Yağ dəyişmə",
    av: 1,
    discount: 0,
    oil: "",

  },

  GEDIS: {
    code: "",
    name: "Servis çıxışı",
    av: 0, // KM-dən hesablanacaq
    discount: 0,
  
  },
};
