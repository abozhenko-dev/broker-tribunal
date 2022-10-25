import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model, SortOrder } from "mongoose";

import { FeedbackGetAllQuery } from "@common/declarations";
import { Feedback, FeedbackDocument } from "@common/models";

@Injectable()
export class FeedbackService {
  constructor(@InjectModel(Feedback.name) private readonly FeedbackModel: Model<FeedbackDocument>) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getAll(query: FeedbackGetAllQuery) {
    const sort: Record<string, SortOrder> = {};

    if (query?.sortByDate) sort.createdAt = query.sortByDate;

    const skip = query.size * (query.page - 1);
    const categories = await this.FeedbackModel.find().sort(sort).skip(skip).limit(query.size);
    const total = await this.FeedbackModel.count();

    return { data: categories, total };
  }
}
