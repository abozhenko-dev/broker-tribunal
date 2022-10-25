import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { FilterQuery, Model, SortOrder } from "mongoose";

import {
  FileUploadBody,
  HttpStatusMessages,
  IFile,
  MongoIdDto,
  OverviewCreateBody,
  OverviewGetAllQuery,
  OverviewUpdateBody
} from "@common/declarations";
import { DuplicateSlugException } from "@common/exceptions";
import { Overview, OverviewDocument } from "@common/models";
import { BucketService } from "@common/services";

@Injectable()
export class OverviewService {
  constructor(
    @InjectModel(Overview.name) private readonly OverviewModel: Model<OverviewDocument>,
    private readonly bucketService: BucketService
  ) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getAll(query: OverviewGetAllQuery) {
    const options: FilterQuery<OverviewDocument> = { lang: query.lang };
    const sort: Record<string, SortOrder> = {};

    if (query?.categories?.length) options.categories = { $in: query.categories };
    if (query?.searchByTitle) options.title = { $regex: query.searchByTitle, $options: "i" };
    if (query?.searchBySlug) options.slug = { $regex: query.searchBySlug, $options: "i" };
    if (query?.sortByDate) sort.createdAt = query.sortByDate;

    const skip = query.size * (query.page - 1);
    const overviews = await this.OverviewModel.find(options).populate("logo").sort(sort).skip(skip).limit(query.size);
    const total = await this.OverviewModel.count(options);

    return { data: overviews, total };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getOne(params: MongoIdDto) {
    const overview = await this.OverviewModel.findById(params.id).populate("logo");
    return overview;
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async create(body: OverviewCreateBody) {
    const isSlugDuplicated = await this.OverviewModel.exists({ slug: body.slug, lang: body.lang });
    if (isSlugDuplicated) throw new DuplicateSlugException();

    await this.OverviewModel.create(body);
    await this.bucketService.approve([body.logo]);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async update(params: MongoIdDto, body: OverviewUpdateBody) {
    const isSlugDuplicated = await this.OverviewModel.exists({ _id: { $ne: params.id }, slug: body.slug, lang: body.lang });
    if (isSlugDuplicated) throw new DuplicateSlugException();

    await this.OverviewModel.findByIdAndUpdate(params.id, body);
    await this.bucketService.approve([body.logo]);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async delete(params: MongoIdDto) {
    const overview = await this.OverviewModel.findByIdAndDelete(params.id).populate<{ logo: IFile }>("logo");
    await this.bucketService.deleteMany([overview.logo]);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async upload(file: Express.Multer.File, body: FileUploadBody) {
    const logo = await this.bucketService.upload(file, body, "overviews/logos");
    return logo;
  }
}
