interface IImageMeta {
  type: string;
  width: number;
  height: number;
  alt?: string;
  title?: string;
}

export interface IImage {
  _id: string;
  meta: IImageMeta;
  link: string;
  isApproved: boolean;
}
