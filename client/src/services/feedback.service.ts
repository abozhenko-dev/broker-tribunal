import {
  ComplaintSchema,
  ConsultationSchema,
  PromoSchema
} from "@utils/schemas";

import { $api } from "./axios.service";

export class FeedbackService {
  static consultation(body: ConsultationSchema) {
    return $api.post("/feedback/consultation", body);
  }

  static complaint(body: ComplaintSchema) {
    return $api.post("/feedback/complaint", body);
  }

  static promotion(body: PromoSchema) {
    return $api.post("/feedback/promotion", body);
  }
}
