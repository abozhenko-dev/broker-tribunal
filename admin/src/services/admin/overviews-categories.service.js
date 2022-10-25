import { $api } from "../axios.service";

export class OverviewsCategoriesService {
  static getAll(params) {
    return $api.get("/overviews-categories", { params });
  }

  static getOne(id) {
    return $api.get(`/overviews-categories/${id}`);
  }

  static create(values) {
    return $api.post("/overviews-categories", values);
  }

  static update(id, values) {
    return $api.put(`/overviews-categories/${id}`, values);
  }

  static delete(id) {
    return $api.delete(`/overviews-categories/${id}`);
  }
}
