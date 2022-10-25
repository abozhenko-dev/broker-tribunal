/* eslint-disable no-use-before-define */
import { IImage } from "./image.types";
import { IGeneralMeta } from "./meta.types";

export interface IOverview {
  _id: string;
  title: string;
  logo: IImage;
  content: string;
  shortDescription?: string;
  categories: IOverviewCategory[];
  meta: IGeneralMeta;
  slug: string;
  lang: string;
  createdAt: string;
}

export interface IOverviewCategory {
  _id: string;
  name: string;
  description: string[];
  showOnHome: boolean;
  slug: string;
  meta: IGeneralMeta;
  overviews: IOverview[];
  overviewsTotal: number;
}
