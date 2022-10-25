import { $api } from "@services/axios.service";

export class TranslationsService {
  static getOne(params) {
    return $api.get("/translations", { params });
  }

  static update(values) {
    return $api.put("/translations", values);
  }
}
