import { ReactNode } from "react";

export type DeepPartial<T> = {
  [P in keyof T]: DeepPartial<T[P]>;
};

interface ISocial {
  value: string;
  go: string;
}

interface ICard {
  title: string;
  description: string;
}

export interface ITranslation {
  alt: Record<string, string>;
  ariaLabels: Record<string, string>;
  socials: Record<string, ISocial>;
  validation: Record<string, string>;
  navigation: Record<string, string>;
  form: {
    labels: Record<string, string>;
    placeholder: Record<string, string>;
  };
  filters: Record<string, string>;
  cards: Record<string, ICard[]>;
  bin: Record<string, string | ReactNode>;
  statistics: Record<string, string>;
}
