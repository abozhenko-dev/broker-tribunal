import { INews, ITag } from "@declarations";

import { $api } from "./axios.service";

export class NewsService {
  static getTags(lang: string) {
    return $api.get<ITag[]>("/news-tags", {
      params: {
        lang
      }
    });
  }

  static getArticles(params: any) {
    return $api.get<INews[]>("/news", {
      params
    });
  }

  static getArticle(slug: string, lang: string) {
    return $api.get<INews>(`/news/${slug}`, {
      params: {
        lang
      }
    });
  }

  static last(lang: string) {
    return $api.get<INews[]>("/news/last", {
      params: {
        lang
      }
    });
  }
}
