import { $api } from "../axios.service";

export class BlogTagsService {
  static getAll(params) {
    return $api.get("/blog-tags", { params });
  }

  static getOne(id) {
    return $api.get(`/blog-tags/${id}`);
  }

  static create(values) {
    return $api.post("/blog-tags", values);
  }

  static update(id, values) {
    return $api.put(`/blog-tags/${id}`, values);
  }

  static delete(id) {
    return $api.delete(`/blog-tags/${id}`);
  }
}
