import axios from "axios";

import { NEXT_PUBLIC_BUCKET_URL } from "@constants";

export class TranslationService {
  static getOne(lang: string) {
    return axios.get(`${NEXT_PUBLIC_BUCKET_URL}/translations/${lang}.json`);
  }
}
