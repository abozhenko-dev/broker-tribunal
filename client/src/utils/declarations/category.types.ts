import { ICompany } from "./company.types";
import { IMeta } from "./meta.types";

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  meta: IMeta;
  description: string[];
  brokers: ICompany[];
  brokersTotal: number;
}
