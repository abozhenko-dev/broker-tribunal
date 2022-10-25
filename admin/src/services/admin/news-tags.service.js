import { $api } from "../axios.service";

export class NewsTagsService {
  static getAll(params) {
    return $api.get("/news-tags", { params });
  }

  static getOne(id) {
    return $api.get(`/news-tags/${id}`);
  }

  static create(values) {
    return $api.post("/news-tags", values);
  }

  static update(id, values) {
    return $api.put(`/news-tags/${id}`, values);
  }

  static delete(id) {
    return $api.delete(`/news-tags/${id}`);
  }
}
