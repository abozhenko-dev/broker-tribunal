export interface IGeneralMeta {
  title: string;
  description?: string;
  breadcrumb?: string;
  noIndex?: boolean;
}

export interface IFaq {
  title: string;
  content: string[];
}

export interface IMeta extends IGeneralMeta {
  seo?: string;
  faqs?: IFaq[];
}
