import { IArticle, ITag } from "@declarations";

import { $api } from "./axios.service";

export class BlogService {
  static getTags(lang: string) {
    return $api.get<ITag[]>("/blog-tags", {
      params: {
        lang
      }
    });
  }

  static getArticles(params: any) {
    return $api.get<IArticle[]>("/blog", {
      params
    });
  }

  static getArticle(slug: string, lang: string) {
    return $api.get<IArticle>(`/blog/${slug}`, {
      params: {
        lang
      }
    });
  }
}
