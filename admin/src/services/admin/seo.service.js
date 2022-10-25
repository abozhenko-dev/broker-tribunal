import { $api } from "../axios.service";

export class SeoService {
  static getOne() {
    return $api.get("/seo");
  }

  static update(values) {
    return $api.put("/seo", values);
  }
}
