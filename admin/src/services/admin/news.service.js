import { $api } from "../axios.service";

export class NewsService {
  static getAll(params) {
    return $api.get("/news", { params });
  }

  static getOne(id) {
    return $api.get(`/news/${id}`);
  }

  static create(values) {
    return $api.post("/news", values);
  }

  static update(id, values) {
    return $api.put(`/news/${id}`, values);
  }

  static delete(id) {
    return $api.delete(`/news/${id}`);
  }

  static uploadPoster(values) {
    return $api.post("/news/upload/poster", values);
  }
}
