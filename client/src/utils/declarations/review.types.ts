import { IImage } from "./image.types";

export interface IReview {
  _id: string;
  authorName: string;
  authorEmail: string;
  authorPhone: string;
  problem: string;
  comment: string;
  rating: number;
  entity: "broker" | "regulator";
  entitySlug: string;
  isApproved: boolean;
  createdAt: string;
  entityLogo: IImage;
}
