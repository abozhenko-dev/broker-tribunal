import { $api } from "../axios.service";

export class BlogService {
  static getAll(params) {
    return $api.get("/blog", { params });
  }

  static getOne(id) {
    return $api.get(`/blog/${id}`);
  }

  static create(values) {
    return $api.post("/blog", values);
  }

  static update(id, values) {
    return $api.put(`/blog/${id}`, values);
  }

  static delete(id) {
    return $api.delete(`/blog/${id}`);
  }

  static uploadPoster(values) {
    return $api.post("/blog/upload/poster", values);
  }
}
