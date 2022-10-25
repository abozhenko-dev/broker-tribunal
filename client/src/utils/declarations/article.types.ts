import { IImage } from "./image.types";
import { IGeneralMeta } from "./meta.types";

export interface IArticle {
  _id: string;
  title: string;
  poster: IImage;
  content: string;
  tags: string[];
  views: number;
  shortDescription?: string;
  relatedArticles: IArticle[];
  createdDate: string;
  meta: IGeneralMeta;
  slug: string;
}
