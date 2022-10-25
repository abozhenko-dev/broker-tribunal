import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { FilterQuery, Model, SortOrder } from "mongoose";

import { HttpStatusMessages, MongoIdDto, ReviewApproveBody, ReviewEntityEnum, ReviewGetAllQuery } from "@common/declarations";
import { Broker, BrokerDocument, Regulator, RegulatorDocument, Review, ReviewDocument } from "@common/models";

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private readonly ReviewModel: Model<ReviewDocument>,
    @InjectModel(Broker.name) private readonly BrokerModel: Model<BrokerDocument>,
    @InjectModel(Regulator.name) private readonly RegulatorModel: Model<RegulatorDocument>
  ) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getAll(query: ReviewGetAllQuery) {
    const options: FilterQuery<ReviewDocument> = { entity: query.filterByEntity };
    const sort: Record<string, SortOrder> = {};

    if (query.sortByDate) sort.createdAt = query.sortByDate;
    if (query.sortByStatus) sort.isApproved = query.sortByStatus;

    const skip = query.size * (query.page - 1);
    const reviews = await this.ReviewModel.find(options).sort(sort).skip(skip).limit(query.size);
    const total = await this.ReviewModel.count(options);

    return { data: reviews, total };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async approve(body: ReviewApproveBody) {
    const reviews = await this.ReviewModel.find({ _id: { $in: body.ids } }).lean();

    await this.ReviewModel.updateMany({ _id: { $in: body.ids } }, { $set: { isApproved: true } });

    for (const review of reviews) {
      if (review.entity === ReviewEntityEnum.BROKER) {
        const broker = await this.BrokerModel.findOne({ slug: review.entitySlug })
          .populate({ path: "reviews", match: { isApproved: true } })
          .lean();

        const rating = await this.calcRating(broker.reviews);
        await this.BrokerModel.updateMany({ slug: review.entitySlug }, { $set: { rating } });
      } else if (review.entity === ReviewEntityEnum.REGULATOR) {
        const regulator = await this.RegulatorModel.findOne({ slug: review.entitySlug })
          .populate({ path: "reviews", match: { isApproved: true } })
          .lean();

        const rating = await this.calcRating(regulator.reviews);
        await this.RegulatorModel.updateMany({ slug: review.entitySlug }, { $set: { rating } });
      }
    }

    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async delete(params: MongoIdDto) {
    const review = await this.ReviewModel.findByIdAndDelete(params.id);

    if (review.entity === ReviewEntityEnum.BROKER) {
      const broker = await this.BrokerModel.findOne({ slug: review.entitySlug })
        .populate({ path: "reviews", match: { isApproved: true } })
        .lean();

      const rating = await this.calcRating(broker.reviews);
      await this.BrokerModel.updateMany({ slug: review.entitySlug }, { $pull: { reviews: review._id }, $set: { rating } });
    } else if (review.entity === ReviewEntityEnum.REGULATOR) {
      const regulator = await this.RegulatorModel.findOne({ slug: review.entitySlug })
        .populate({ path: "reviews", match: { isApproved: true } })
        .lean();

      const rating = await this.calcRating(regulator.reviews);
      await this.RegulatorModel.updateMany({ slug: review.entitySlug }, { $pull: { reviews: review._id }, $set: { rating } });
    }

    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  calcRating(reviews) {
    if (!reviews?.length) return 0;
    const rating = reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;
    return rating.toFixed(2);
  }
}
