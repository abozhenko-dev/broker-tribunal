import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import { LangDto, SlugDto } from "@common/declarations";
import { Metadata, MetadataDocument } from "@common/models";

@Injectable()
export class MetadataService {
  constructor(@InjectModel(Metadata.name) private readonly MetadataModel: Model<MetadataDocument>) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getOne(params: SlugDto, query: LangDto) {
    const metadata = await this.MetadataModel.findOne({ slug: params.slug, lang: query.lang });
    return metadata;
  }
}
