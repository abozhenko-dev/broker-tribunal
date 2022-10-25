import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import { LangDto, SlugDto } from "@common/declarations";
import { Overview, OverviewDocument } from "@common/models";

@Injectable()
export class OverviewService {
  constructor(@InjectModel(Overview.name) private readonly OverviewModel: Model<OverviewDocument>) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getOne(params: SlugDto, query: LangDto) {
    const overview = await this.OverviewModel.findOne({ slug: params.slug, lang: query.lang }).populate("logo categories");
    return overview;
  }
}
