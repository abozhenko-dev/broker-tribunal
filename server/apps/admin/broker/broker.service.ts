import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { FilterQuery, Model, SortOrder } from "mongoose";

import {
  BrokerCreateBody,
  BrokerGetAllQuery,
  BrokerUpdateBody,
  FileUploadBody,
  HttpStatusMessages,
  IFile,
  MongoIdDto
} from "@common/declarations";
import { DuplicateSlugException } from "@common/exceptions";
import { Broker, BrokerDocument, Review, ReviewDocument } from "@common/models";
import { BucketService } from "@common/services";

@Injectable()
export class BrokerService {
  constructor(
    @InjectModel(Broker.name) private readonly BrokerModel: Model<BrokerDocument>,
    @InjectModel(Review.name) private readonly ReviewModel: Model<ReviewDocument>,
    private readonly bucketService: BucketService
  ) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getAll(query: BrokerGetAllQuery) {
    const options: FilterQuery<BrokerDocument> = { lang: query.lang };
    const sort: Record<string, SortOrder> = {};

    if (query?.categories?.length) options.categories = { $in: query.categories };
    if (query?.searchByName) options.name = { $regex: query.searchByName, $options: "i" };
    if (query?.searchBySlug) options.slug = { $regex: query.searchBySlug, $options: "i" };
    if (query?.sortByDate) sort.createdAt = query.sortByDate;

    const skip = query.size * (query.page - 1);
    const brokers = await this.BrokerModel.find(options).populate("logo").sort(sort).skip(skip).limit(query.size);

    const total = await this.BrokerModel.count(options);

    return { data: brokers, total };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getOne(params: MongoIdDto) {
    const broker = await this.BrokerModel.findById(params.id).populate("logo");
    return broker;
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async create(body: BrokerCreateBody) {
    const isSlugDuplicated = await this.BrokerModel.exists({ slug: body.slug, lang: body.lang });
    if (isSlugDuplicated) throw new DuplicateSlugException();

    await this.BrokerModel.create(body);
    await this.bucketService.approve([body.logo]);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async update(params: MongoIdDto, body: BrokerUpdateBody) {
    const isSlugDuplicated = await this.BrokerModel.exists({ _id: { $ne: params.id }, slug: body.slug, lang: body.lang });
    if (isSlugDuplicated) throw new DuplicateSlugException();

    await this.BrokerModel.findByIdAndUpdate(params.id, body);
    await this.bucketService.approve([body.logo]);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async delete(params: MongoIdDto) {
    const broker = await this.BrokerModel.findByIdAndDelete(params.id).populate<{ logo: IFile }>("logo");

    await this.ReviewModel.deleteMany({ _id: { $in: broker.reviews } });
    await this.bucketService.deleteMany([broker.logo]);

    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async upload(file: Express.Multer.File, body: FileUploadBody) {
    const logo = await this.bucketService.upload(file, body, "brokers/logos");
    return logo;
  }
}
