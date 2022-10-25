import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { FilterQuery, Model, SortOrder } from "mongoose";

import {
  FileUploadBody,
  HttpStatusMessages,
  IFile,
  MongoIdDto,
  NewsCreateBody,
  NewsGetAllQuery,
  NewsUpdateBody
} from "@common/declarations";
import { DuplicateSlugException } from "@common/exceptions";
import { News, NewsDocument } from "@common/models";
import { BucketService } from "@common/services";

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name) private readonly NewsModel: Model<NewsDocument>,
    private readonly bucketService: BucketService
  ) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getAll(query: NewsGetAllQuery) {
    const options: FilterQuery<NewsDocument> = { lang: query.lang };
    const sort: Record<string, SortOrder> = {};

    if (query?.tags?.length) options.tags = { $in: query.tags };
    if (query?.searchByTitle) options.title = { $regex: query.searchByTitle, $options: "i" };
    if (query?.searchBySlug) options.slug = { $regex: query.searchBySlug, $options: "i" };
    if (query?.sortByDate) sort.createdAt = query.sortByDate;

    const skip = query.size * (query.page - 1);
    const news = await this.NewsModel.find(options).populate("poster").sort(sort).skip(skip).limit(query.size);
    const total = await this.NewsModel.count(options);

    return { data: news, total };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getOne(params: MongoIdDto) {
    const news = await this.NewsModel.findById(params.id).populate("poster");
    return news;
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async create(body: NewsCreateBody) {
    const isSlugDuplicated = await this.NewsModel.exists({ slug: body.slug, lang: body.lang });
    if (isSlugDuplicated) throw new DuplicateSlugException();

    await this.NewsModel.create(body);
    await this.bucketService.approve([body.poster]);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async update(params: MongoIdDto, body: NewsUpdateBody) {
    const isSlugDuplicated = await this.NewsModel.exists({ _id: { $ne: params.id }, slug: body.slug, lang: body.lang });
    if (isSlugDuplicated) throw new DuplicateSlugException();

    await this.NewsModel.findByIdAndUpdate(params.id, body);
    await this.bucketService.approve([body.poster]);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async delete(params: MongoIdDto) {
    const news = await this.NewsModel.findByIdAndDelete(params.id).populate<{ poster: IFile }>("poster");
    await this.bucketService.deleteMany([news.poster]);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async upload(file: Express.Multer.File, body: FileUploadBody) {
    const poster = await this.bucketService.upload(file, body, "news/posters");
    return poster;
  }
}
