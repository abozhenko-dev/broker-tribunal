import { IImage } from "./image.types";
import { IFaq, IMeta } from "./meta.types";
import { IReview } from "./review.types";

export interface ICompany {
  _id: string;
  name: string;
  categories: string[];
  rating: number;
  logo: IImage;
  jurisdiction: string;
  minDeposit: number;
  foundingDate: string;
  about: string;
  info: {
    email: string;
    phone: string;
    country: string;
    website: string;
  };
  isInCatalog: boolean;
  meta: IMeta;
  faqs: IFaq[];
  slug: string;
  reviews: IReview[];
}
