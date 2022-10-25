import { $api } from "../axios.service";

export class OverviewsService {
  static getAll(params) {
    return $api.get("/overviews", { params });
  }

  static getOne(id) {
    return $api.get(`/overviews/${id}`);
  }

  static create(values) {
    return $api.post("/overviews", values);
  }

  static update(id, values) {
    return $api.put(`/overviews/${id}`, values);
  }

  static delete(id) {
    return $api.delete(`/overviews/${id}`);
  }

  static uploadLogo(values) {
    return $api.post("/overviews/upload/logo", values);
  }
}
