import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { FilterQuery, Model } from "mongoose";

import {
  HttpStatusMessages,
  MetadataCreateBody,
  MetadataGetAllQuery,
  MetadataUpdateBody,
  MongoIdDto
} from "@common/declarations";
import { DuplicateSlugException } from "@common/exceptions";
import { Metadata, MetadataDocument } from "@common/models";

@Injectable()
export class MetadataService {
  constructor(@InjectModel(Metadata.name) private readonly MetadataModel: Model<MetadataDocument>) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getAll(query: MetadataGetAllQuery) {
    const options: FilterQuery<MetadataDocument> = { lang: query.lang };

    if (query.searchByTitle) options.title = { $regex: query.searchByTitle, $options: "i" };
    if (query.searchBySlug) options.slug = { $regex: query.searchBySlug, $options: "i" };

    const skip = query.size * (query.page - 1);
    const metadata = await this.MetadataModel.find(options).skip(skip).limit(query.size);
    const total = await this.MetadataModel.count(options);

    return { data: metadata, total };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getOne(params: MongoIdDto) {
    const metadata = await this.MetadataModel.findById(params.id);
    return metadata;
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async create(body: MetadataCreateBody) {
    const isSlugDuplicated = await this.MetadataModel.findOne({ slug: body.slug, lang: body.lang });
    if (isSlugDuplicated) throw new DuplicateSlugException();

    await this.MetadataModel.create(body);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async update(params: MongoIdDto, body: MetadataUpdateBody) {
    await this.MetadataModel.findByIdAndUpdate(params.id, body);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async delete(params: MongoIdDto) {
    await this.MetadataModel.findByIdAndDelete(params.id);
    return { message: HttpStatusMessages.OK };
  }
}
