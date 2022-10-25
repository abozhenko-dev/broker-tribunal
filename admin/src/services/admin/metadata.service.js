import { $api } from "../axios.service";

export class MetadataService {
  static getAll(params) {
    return $api.get("/metadata", { params });
  }

  static getOne(id) {
    return $api.get(`/metadata/${id}`);
  }

  static create(values) {
    return $api.post("/metadata", values);
  }

  static update(id, values) {
    return $api.put(`/metadata/${id}`, values);
  }

  static delete(id) {
    return $api.delete(`/metadata/${id}`);
  }
}
