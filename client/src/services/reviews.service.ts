import { IReview } from "@declarations";

import { ReviewDto } from "@utils/schemas";

import { $api } from "./axios.service";

export class ReviewsService {
  static create(body: ReviewDto) {
    return $api.post("/reviews", body);
  }

  static get() {
    return $api.get<IReview[]>("/reviews");
  }
}
