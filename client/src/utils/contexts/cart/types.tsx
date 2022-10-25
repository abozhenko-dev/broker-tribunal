import { ReactNode } from "react";

import { DeepPartial, ITranslation } from "@declarations";

import { TranslationKeys } from "@utils/translations";

export type Translation = Record<TranslationKeys, DeepPartial<ITranslation>>;

export interface TranslationProviderProps {
  children: ReactNode;
  translation: ITranslation;
}
