import { de } from "./de";
import { en } from "./en";
import { ru } from "./ru";

export const translations = {
  ru,
  de,
  en
};

export type TranslationKeys = keyof typeof translations;
