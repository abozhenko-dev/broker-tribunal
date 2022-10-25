import { IOverview, IOverviewCategory } from "@declarations";

import { $api } from "./axios.service";

export class OverviewService {
  static getCategories(lang: string) {
    return $api.get<IOverviewCategory[]>("/overviews-categories", {
      params: {
        lang
      }
    });
  }

  static getMainCategory(lang: string) {
    return $api.get<IOverviewCategory>("/overviews-categories/main", {
      params: {
        lang
      }
    });
  }

  static getOverviewsByCategory(slug: string, params: any) {
    return $api.get<IOverviewCategory>(`/overviews-categories/${slug}`, {
      params
    });
  }

  static getOverview(slug: string, lang: string) {
    return $api.get<IOverview>(`/overviews/${slug}`, {
      params: {
        lang
      }
    });
  }
}
