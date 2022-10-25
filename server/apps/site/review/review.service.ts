import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import { HttpStatusMessages, ReviewCreateBody, ReviewEntityEnum } from "@common/declarations";
import { Broker, BrokerDocument, Regulator, RegulatorDocument, Review, ReviewDocument } from "@common/models";

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private readonly ReviewModel: Model<ReviewDocument>,
    @InjectModel(Broker.name) private readonly BrokerModel: Model<BrokerDocument>,
    @InjectModel(Regulator.name) private readonly RegulatorModel: Model<RegulatorDocument>
  ) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getAll() {
    const reviews = await this.ReviewModel.find().populate("entityLogo").sort({ createdAt: -1 }).limit(16);
    return reviews;
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async create(body: ReviewCreateBody) {
    const review = await this.ReviewModel.create(body);

    if (body.entity === ReviewEntityEnum.BROKER) await this.updateBroker(body.entitySlug, review._id);
    else if (body.entity === ReviewEntityEnum.REGULATOR) await this.updateRegulator(body.entitySlug, review._id);

    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async updateBroker(slug: string, reviewId: string) {
    const item = await this.BrokerModel.findOne({ slug });
    await this.BrokerModel.updateMany({ slug }, { $push: { reviews: reviewId } });
    await this.ReviewModel.findByIdAndUpdate(reviewId, { entityLogo: item.logo });
  }

  async updateRegulator(slug: string, reviewId: string) {
    const item = await this.RegulatorModel.findOne({ slug });
    await this.RegulatorModel.updateMany({ slug }, { $push: { reviews: reviewId } });
    await this.ReviewModel.findByIdAndUpdate(reviewId, { entityLogo: item.logo });
  }

  calcRating(reviews, rating) {
    return (reviews.reduce((acc, item) => acc + item.rating, 0) + rating) / (reviews.length + 1);
  }
}
