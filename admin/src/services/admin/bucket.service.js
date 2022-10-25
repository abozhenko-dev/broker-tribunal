import { $api } from "../axios.service";

export class BucketService {
  static updateFile(id, body) {
    return $api.put(`/bucket/${id}`, body);
  }

  static deleteFile(id) {
    return $api.delete(`/bucket/${id}`);
  }
}
