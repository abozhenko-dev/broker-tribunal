import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { FilterQuery, Model, SortOrder } from "mongoose";

import {
  AdminRegulatorGetAllQuery,
  FileUploadBody,
  HttpStatusMessages,
  IFile,
  MongoIdDto,
  RegulatorCreateBody,
  RegulatorUpdateBody
} from "@common/declarations";
import { DuplicateSlugException } from "@common/exceptions";
import { Regulator, RegulatorDocument, Review, ReviewDocument } from "@common/models";
import { BucketService } from "@common/services";

@Injectable()
export class RegulatorService {
  constructor(
    @InjectModel(Regulator.name) private readonly RegulatorModel: Model<RegulatorDocument>,
    @InjectModel(Review.name) private readonly ReviewModel: Model<ReviewDocument>,
    private readonly bucketService: BucketService
  ) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getAll(query: AdminRegulatorGetAllQuery) {
    const options: FilterQuery<RegulatorDocument> = { lang: query.lang };
    const sort: Record<string, SortOrder> = {};

    if (query?.searchByName) options.name = { $regex: query.searchByName, $options: "i" };
    if (query?.searchBySlug) options.slug = { $regex: query.searchBySlug, $options: "i" };
    if (query?.sortByDate) sort.createdAt = query.sortByDate;

    const skip = query.size * (query.page - 1);
    const regulators = await this.RegulatorModel.find(options).populate("logo").sort(sort).skip(skip).limit(query.size);
    const total = await this.RegulatorModel.count(options);

    return { data: regulators, total };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getOne(params: MongoIdDto) {
    const regulator = await this.RegulatorModel.findById(params.id).populate("logo");
    return regulator;
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async create(body: RegulatorCreateBody) {
    const isSlugDuplicated = await this.RegulatorModel.exists({ slug: body.slug, lang: body.lang });
    if (isSlugDuplicated) throw new DuplicateSlugException();

    await this.RegulatorModel.create(body);
    await this.bucketService.approve([body.logo]);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async update(params: MongoIdDto, body: RegulatorUpdateBody) {
    const isSlugDuplicated = await this.RegulatorModel.exists({
      _id: { $ne: params.id },
      slug: body.slug,
      lang: body.lang
    });

    if (isSlugDuplicated) throw new DuplicateSlugException();

    await this.RegulatorModel.findByIdAndUpdate(params.id, body);
    await this.bucketService.approve([body.logo]);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async delete(params: MongoIdDto) {
    const regulator = await this.RegulatorModel.findByIdAndDelete(params.id).populate<{ logo: IFile }>("logo");

    await this.ReviewModel.deleteMany({ _id: { $in: regulator.reviews } });
    await this.bucketService.deleteMany([regulator.logo]);

    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async upload(file: Express.Multer.File, body: FileUploadBody) {
    const logo = await this.bucketService.upload(file, body, "regulators/logos");
    return logo;
  }
}
