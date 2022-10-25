import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { FilterQuery, Model, SortOrder } from "mongoose";

import {
  HttpStatusMessages,
  MongoIdDto,
  NewsTagCreateBody,
  NewsTagGetAllQueryDto,
  NewsTagUpdateBody
} from "@common/declarations";
import { News, NewsDocument, NewsTag, NewsTagDocument } from "@common/models";

@Injectable()
export class NewsTagService {
  constructor(
    @InjectModel(NewsTag.name) private readonly NewsTagModel: Model<NewsTagDocument>,
    @InjectModel(News.name) private readonly NewsModel: Model<NewsDocument>
  ) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getAll(query: NewsTagGetAllQueryDto) {
    const options: FilterQuery<NewsTagDocument> = { lang: query.lang };
    const sort: Record<string, SortOrder> = {};

    if (query?.sortByDate) sort.createdAt = query.sortByDate;

    const skip = query.size * (query.page - 1);
    const tags = await this.NewsTagModel.find(options).sort(sort).skip(skip).limit(query.size);
    const total = await this.NewsTagModel.count(options);

    return { data: tags, total };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getOne(params: MongoIdDto) {
    const tag = await this.NewsTagModel.findById(params.id);
    return tag;
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async create(body: NewsTagCreateBody) {
    await this.NewsTagModel.create(body);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async update(params: MongoIdDto, body: NewsTagUpdateBody) {
    await this.NewsTagModel.findByIdAndUpdate(params.id, body);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async delete(params: MongoIdDto) {
    const tag = await this.NewsTagModel.findByIdAndDelete(params.id);
    await this.NewsModel.updateMany({ tags: tag.name }, { $pull: { tags: tag.name } });
    return { message: HttpStatusMessages.OK };
  }
}
