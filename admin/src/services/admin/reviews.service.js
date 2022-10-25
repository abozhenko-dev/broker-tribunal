import { $api } from "../axios.service";

export class ReviewsService {
  static getAll(params) {
    return $api.get("/reviews", { params });
  }

  static approve(values) {
    return $api.post("/reviews/approve", values);
  }

  static delete(id) {
    return $api.delete(`/reviews/${id}`);
  }
}
