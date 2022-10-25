import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { FilterQuery, Model, SortOrder } from "mongoose";

import {
  CategoryCreateBody,
  CategoryGetAllQuery,
  CategoryUpdateBody,
  HttpStatusMessages,
  MongoIdDto
} from "@common/declarations";
import { DuplicateSlugException } from "@common/exceptions";
import { Broker, BrokerDocument, Category, CategoryDocument } from "@common/models";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly CategoryModel: Model<CategoryDocument>,
    @InjectModel(Broker.name) private readonly BrokerModel: Model<BrokerDocument>
  ) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getAll(query: CategoryGetAllQuery) {
    const options: FilterQuery<CategoryDocument> = { lang: query.lang };
    const sort: Record<string, SortOrder> = {};

    if (query?.searchByName) options.name = { $regex: query.searchByName, $options: "i" };
    if (query?.searchBySlug) options.slug = { $regex: query.searchBySlug, $options: "i" };
    if (query?.sortByDate) sort.createdAt = query.sortByDate;

    const skip = query.size * (query.page - 1);
    const categories = await this.CategoryModel.find(options).skip(skip).limit(query.size);
    const total = await this.CategoryModel.count(options);

    return { data: categories, total };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getOne(params: MongoIdDto) {
    const category = await this.CategoryModel.findById(params.id);
    return category;
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async create(body: CategoryCreateBody) {
    const isSlugDuplicated = await this.CategoryModel.exists({ slug: body.slug, lang: body.lang });
    if (isSlugDuplicated) throw new DuplicateSlugException();

    await this.CategoryModel.create(body);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async update(params: MongoIdDto, body: CategoryUpdateBody) {
    const isSlugDuplicated = await this.CategoryModel.exists({ _id: { $ne: params.id }, slug: body.slug, lang: body.lang });
    if (isSlugDuplicated) throw new DuplicateSlugException();

    await this.CategoryModel.findByIdAndUpdate(params.id, body);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async delete(params: MongoIdDto) {
    await this.CategoryModel.findByIdAndDelete(params.id);
    await this.BrokerModel.updateMany({ categories: params.id }, { $pull: { categories: params.id } });
    return { message: HttpStatusMessages.OK };
  }
}
