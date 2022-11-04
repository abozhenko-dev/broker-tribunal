import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { FilterQuery, Model, SortOrder } from "mongoose";

import {
  HttpStatusMessages,
  LangDto,
  OverviewCategoryGetAllQuery,
  OverviewCategoryGetOneQuery,
  SlugDto,
  SortWithDefaultEnum
} from "@common/declarations";
import { Overview, OverviewCategory, OverviewCategoryDocument, OverviewDocument } from "@common/models";

@Injectable()
export class OverviewCategoryService {
  constructor(
    @InjectModel(OverviewCategory.name) private readonly OverviewCategoryModel: Model<OverviewCategoryDocument>,
    @InjectModel(Overview.name) private readonly OverviewModel: Model<OverviewDocument>
  ) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getAll(query: OverviewCategoryGetAllQuery) {
    const categories = await this.OverviewCategoryModel.find({ lang: query.lang });
    return categories;
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getMain(query: LangDto) {
    const category = await this.OverviewCategoryModel.findOne({ showOnHome: true, lang: query.lang }).lean();
    if (!category) return null

    const overviews = await this.OverviewModel.find({ categories: category._id })
      .select("title logo slug")
      .populate("logo")
      .limit(7)
      .lean();

    return { ...category, overviews };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getOne(params: SlugDto, query: OverviewCategoryGetOneQuery) {
    const category = await this.OverviewCategoryModel.findOne({ slug: params.slug, lang: query.lang }).lean();

    if (!category) {
      throw new HttpException({ status: HttpStatus.NOT_FOUND, message: HttpStatusMessages.NOT_FOUND }, HttpStatus.NOT_FOUND);
    }

    const overviewOptions: FilterQuery<OverviewDocument> = { categories: category._id, lang: query.lang };
    const overviewsSort: Record<string, SortOrder> = {};

    if (query?.sort) {
      if (query.sort !== SortWithDefaultEnum.DEFAULT) overviewsSort.title = query.sort;
      else overviewsSort.createdAt = -1;
    }

    if (query?.search) overviewOptions.title = { $regex: query.search, $options: "i" };

    const skip = query.size * (query.page - 1);
    const overviews = await this.OverviewModel.find(overviewOptions)
      .populate("logo")
      .skip(skip)
      .limit(query.size)
      .sort(overviewsSort)
      .lean();

    const overviewsTotal = await this.OverviewModel.count(overviewOptions);

    return { ...category, overviews, overviewsTotal };
  }
}
