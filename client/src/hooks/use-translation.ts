import { useContext } from "react";

// import { useRouter } from "next/router";
import { TranslationContext } from "@contexts";

// import { ITranslation } from "@declarations";

// import { mergeDeep } from "@helpers";

// import { TranslationKeys, translations } from "@utils/translations";

// export const useTranslation = () => {
//   // **Props
//   const { locale, defaultLocale } = useRouter();

//   const defaultT = translations[defaultLocale as TranslationKeys];
//   const currentT =
//     locale && translations?.hasOwnProperty(locale)
//       ? translations[locale as TranslationKeys]
//       : translations[defaultLocale as TranslationKeys];

//   return mergeDeep({}, defaultT, currentT) as ITranslation;
// };
export const useTranslation = () => useContext(TranslationContext);
