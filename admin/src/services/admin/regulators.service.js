import { $api } from "../axios.service";

export class RegulatorsService {
  static getAll(params) {
    return $api.get("/regulators", { params });
  }

  static getOne(id) {
    return $api.get(`/regulators/${id}`);
  }

  static create(values) {
    return $api.post("/regulators", values);
  }

  static update(id, values) {
    return $api.put(`/regulators/${id}`, values);
  }

  static delete(id) {
    return $api.delete(`/regulators/${id}`);
  }

  static uploadLogo(values) {
    return $api.post("/regulators/upload/logo", values);
  }
}
