import { IMeta } from "@declarations";

import { $api } from "./axios.service";

export class MetaService {
  static getOne(slug: string, lang: string) {
    return $api.get<IMeta>(`/metadata/${slug}`, {
      params: {
        lang
      }
    });
  }
}
