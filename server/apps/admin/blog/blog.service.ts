import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { FilterQuery, Model, SortOrder } from "mongoose";

import {
  ArticleCreateBody,
  ArticleGetAllQuery,
  ArticleUpdateBody,
  FileUploadBody,
  HttpStatusMessages,
  IFile,
  MongoIdDto
} from "@common/declarations";
import { DuplicateSlugException } from "@common/exceptions";
import { Article, ArticleDocument } from "@common/models";
import { BucketService } from "@common/services";

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Article.name) private readonly ArticleModel: Model<ArticleDocument>,
    private readonly bucketService: BucketService
  ) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getAll(query: ArticleGetAllQuery) {
    const options: FilterQuery<ArticleDocument> = { lang: query.lang };
    const sort: Record<string, SortOrder> = {};

    if (query?.tags?.length) options.tags = { $in: query.tags };
    if (query?.searchByTitle) options.title = { $regex: query.searchByTitle, $options: "i" };
    if (query?.searchBySlug) options.slug = { $regex: query.searchBySlug, $options: "i" };
    if (query?.sortByDate) sort.createdAt = query.sortByDate;

    const skip = query.size * (query.page - 1);
    const articles = await this.ArticleModel.find(options).populate("poster").sort(sort).skip(skip).limit(query.size);

    const total = await this.ArticleModel.count(options);

    return { data: articles, total };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getOne(params: MongoIdDto) {
    const article = await this.ArticleModel.findById(params.id).populate("poster");
    return article;
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async create(body: ArticleCreateBody) {
    const isSlugDuplicated = await this.ArticleModel.exists({ slug: body.slug, lang: body.lang });
    if (isSlugDuplicated) throw new DuplicateSlugException();

    await this.ArticleModel.create(body);
    await this.bucketService.approve([body.poster]);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async update(params: MongoIdDto, body: ArticleUpdateBody) {
    const isSlugDuplicated = await this.ArticleModel.exists({ _id: { $ne: params.id }, slug: body.slug, lang: body.lang });
    if (isSlugDuplicated) throw new DuplicateSlugException();

    await this.ArticleModel.findByIdAndUpdate(params.id, body);
    await this.bucketService.approve([body.poster]);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async delete(params: MongoIdDto) {
    const article = await this.ArticleModel.findByIdAndDelete(params.id).populate<{ poster: IFile }>("poster");

    await this.bucketService.deleteMany([article.poster]);

    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async upload(file: Express.Multer.File, body: FileUploadBody) {
    const poster = await this.bucketService.upload(file, body, "blog/posters");
    return poster;
  }
}
