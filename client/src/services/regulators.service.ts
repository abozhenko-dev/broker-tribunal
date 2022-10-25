import { ICategory } from "@declarations";

import { $api } from "./axios.service";

export class RegulatorsService {
  static getAll(params: any) {
    return $api.get<ICategory[]>("/regulators", {
      params
    });
  }

  static getOne(slug: string, lang: string) {
    return $api.get<ICategory>(`/regulators/${slug}`, {
      params: {
        lang
      }
    });
  }
}
