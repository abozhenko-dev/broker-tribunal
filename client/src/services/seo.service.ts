import { ISeo } from "@declarations";

import { $api } from "./axios.service";

export class SeoService {
  static get() {
    return $api.get<ISeo>("/seo");
  }

  static sitemap() {
    return $api.get("/sitemap");
  }
}
