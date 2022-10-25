import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { FilterQuery, Model, SortOrder } from "mongoose";

import {
  HttpStatusMessages,
  MongoIdDto,
  OverviewCategoryCreateBody,
  OverviewCategoryGetAllQuery,
  OverviewCategoryUpdateBody
} from "@common/declarations";
import { DuplicateSlugException } from "@common/exceptions";
import { Overview, OverviewCategory, OverviewCategoryDocument, OverviewDocument } from "@common/models";

@Injectable()
export class OverviewCategoryService {
  constructor(
    @InjectModel(OverviewCategory.name) private readonly OverviewCategoryModel: Model<OverviewCategoryDocument>,
    @InjectModel(Overview.name) private readonly OverviewModel: Model<OverviewDocument>
  ) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getAll(query: OverviewCategoryGetAllQuery) {
    const options: FilterQuery<OverviewCategoryDocument> = { lang: query.lang };
    const sort: Record<string, SortOrder> = {};

    if (query?.searchByName) options.name = { $regex: query.searchByName, $options: "i" };
    if (query?.searchBySlug) options.slug = { $regex: query.searchBySlug, $options: "i" };
    if (query?.sortByDate) sort.createdAt = query.sortByDate;

    const skip = query.size * (query.page - 1);
    const categories = await this.OverviewCategoryModel.find(options).sort(sort).skip(skip).limit(query.size);
    const total = await this.OverviewCategoryModel.count(options);

    return { data: categories, total };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getOne(params: MongoIdDto) {
    const category = await this.OverviewCategoryModel.findById(params.id);
    return category;
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async create(body: OverviewCategoryCreateBody) {
    const isSlugDuplicated = await this.OverviewCategoryModel.exists({ slug: body.slug, lang: body.lang });
    if (isSlugDuplicated) throw new DuplicateSlugException();

    if (body.showOnHome) {
      await this.OverviewCategoryModel.updateMany({ showOnHome: true, lang: body.lang }, { $set: { showOnHome: false } });
    }

    await this.OverviewCategoryModel.create(body);

    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async update(params: MongoIdDto, body: OverviewCategoryUpdateBody) {
    const isSlugDuplicated = await this.OverviewCategoryModel.exists({
      _id: { $ne: params.id },
      slug: body.slug,
      lang: body.lang
    });

    if (isSlugDuplicated) throw new DuplicateSlugException();

    if (body.showOnHome) {
      await this.OverviewCategoryModel.updateMany({ showOnHome: true, lang: body.lang }, { $set: { showOnHome: false } });
    }

    await this.OverviewCategoryModel.findByIdAndUpdate(params.id, body);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async delete(params: MongoIdDto) {
    await this.OverviewCategoryModel.findByIdAndDelete(params.id);
    await this.OverviewModel.updateMany({ categories: params.id }, { $pull: { categories: params.id } });
    return { message: HttpStatusMessages.OK };
  }
}
