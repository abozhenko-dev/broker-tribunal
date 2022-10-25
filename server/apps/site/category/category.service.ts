import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { FilterQuery, Model, SortOrder } from "mongoose";

import { CategoryGetAllQuery, CategoryGetOneQuery, SlugDto, SortWithDefaultEnum } from "@common/declarations";
import { Broker, BrokerDocument, Category, CategoryDocument } from "@common/models";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly CategoryModel: Model<CategoryDocument>,
    @InjectModel(Broker.name) private readonly BrokerModel: Model<BrokerDocument>
  ) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getAll(query: CategoryGetAllQuery) {
    const categories = await this.CategoryModel.find({ lang: query.lang });
    return categories;
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getOne(params: SlugDto, query: CategoryGetOneQuery) {
    const category = await this.CategoryModel.findOne({ slug: params.slug, lang: query.lang }).lean();

    const brokerOptions: FilterQuery<BrokerDocument> = { categories: category._id, lang: query.lang };
    const brokersSort: Record<string, SortOrder> = {};

    if (query?.sort) {
      if (query.sort !== SortWithDefaultEnum.DEFAULT) brokersSort.rating = query.sort;
      else brokersSort.createdAt = -1;
    }

    if (query?.search) brokerOptions.name = { $regex: query.search, $options: "i" };

    const skip = query.size * (query.page - 1);
    const brokers = await this.BrokerModel.find(brokerOptions)
      .populate("logo")
      .skip(skip)
      .limit(query.size)
      .sort(brokersSort)
      .lean();

    const brokersTotal = await this.BrokerModel.count(brokerOptions);

    return { ...category, brokers, brokersTotal };
  }
}
