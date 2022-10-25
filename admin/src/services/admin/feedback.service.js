import { $api } from "../axios.service";

export class FeedbackService {
  static getAll(params) {
    return $api.get("/feedback", { params });
  }
}
