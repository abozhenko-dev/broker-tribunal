import { IImage } from "./image.types";
import { IGeneralMeta } from "./meta.types";

export interface INews {
  _id: string;
  title: string;
  poster: IImage;
  content: string;
  tags: string[];
  views: number;
  shortDescription?: string;
  relatedNews: INews[];
  createdDate: string;
  meta: IGeneralMeta;
  slug: string;
}
