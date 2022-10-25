import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { FilterQuery, Model, SortOrder } from "mongoose";

import {
  ArticleTagCreateBody,
  ArticleTagGetAllQueryDto,
  ArticleTagUpdateBody,
  HttpStatusMessages,
  MongoIdDto
} from "@common/declarations";
import { Article, ArticleDocument, ArticleTag, ArticleTagDocument } from "@common/models";

@Injectable()
export class BlogTagService {
  constructor(
    @InjectModel(ArticleTag.name) private readonly BlogTagModel: Model<ArticleTagDocument>,
    @InjectModel(Article.name) private readonly BlogModel: Model<ArticleDocument>
  ) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getAll(query: ArticleTagGetAllQueryDto) {
    const options: FilterQuery<ArticleTagDocument> = { lang: query.lang };
    const sort: Record<string, SortOrder> = {};

    if (query?.sortByDate) sort.createdAt = query.sortByDate;

    const skip = query.size * (query.page - 1);
    const tags = await this.BlogTagModel.find(options).sort(sort).skip(skip).limit(query.size);
    const total = await this.BlogTagModel.count(options);

    return { data: tags, total };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getOne(params: MongoIdDto) {
    const tag = await this.BlogTagModel.findById(params.id);
    return tag;
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async create(body: ArticleTagCreateBody) {
    await this.BlogTagModel.create(body);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async update(params: MongoIdDto, body: ArticleTagUpdateBody) {
    await this.BlogTagModel.findByIdAndUpdate(params.id, body);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async delete(params: MongoIdDto) {
    const tag = await this.BlogTagModel.findByIdAndDelete(params.id);
    await this.BlogModel.updateMany({ tags: tag.name }, { $pull: { tags: tag.name } });
    return { message: HttpStatusMessages.OK };
  }
}
