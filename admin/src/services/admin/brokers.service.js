import { $api } from "../axios.service";

export class BrokersService {
  static getAll(params) {
    return $api.get("/brokers", { params });
  }

  static getOne(id) {
    return $api.get(`/brokers/${id}`);
  }

  static create(values) {
    return $api.post("/brokers", values);
  }

  static update(id, values) {
    return $api.put(`/brokers/${id}`, values);
  }

  static delete(id) {
    return $api.delete(`/brokers/${id}`);
  }

  static uploadLogo(values) {
    return $api.post("/brokers/upload/logo", values);
  }
}
