import { FC, createContext } from "react";

import { useRouter } from "next/router";

import { ITranslation } from "@declarations";

import { TranslationKeys, translations } from "@utils/translations";

import { TranslationProviderProps } from "./types";

const TranslationContext = createContext({} as ITranslation);

const TranslationProvider: FC<TranslationProviderProps> = (props) => {
  // **Props
  const { translation, children } = props;
  const { locale } = useRouter();

  return (
    <TranslationContext.Provider
      value={{
        ...translations[locale as TranslationKeys],
        ...translation
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export { TranslationProvider, TranslationContext };
