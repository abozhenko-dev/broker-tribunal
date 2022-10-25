import { $api } from "../axios.service";

export class CategoriesService {
  static getAll(params) {
    return $api.get("/categories", { params });
  }

  static getOne(id) {
    return $api.get(`/categories/${id}`);
  }

  static create(values) {
    return $api.post("/categories", values);
  }

  static update(id, values) {
    return $api.put(`/categories/${id}`, values);
  }

  static delete(id) {
    return $api.delete(`/categories/${id}`);
  }
}
