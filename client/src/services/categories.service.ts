import { ICategory } from "@declarations";

import { $api } from "./axios.service";

export class CategoriesService {
  static getAll(lang: string) {
    return $api.get<ICategory[]>("/categories", {
      params: {
        lang
      }
    });
  }

  static getOne(slug: string, params: any) {
    return $api.get<ICategory>(`/categories/${slug}`, {
      params
    });
  }
}
