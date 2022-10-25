import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { FilterQuery, Model, SortOrder } from "mongoose";

import { LangDto, SiteRegulatorGetAllQuery, SlugDto, SortWithDefaultEnum } from "@common/declarations";
import { Regulator, RegulatorDocument } from "@common/models";

@Injectable()
export class RegulatorService {
  constructor(@InjectModel(Regulator.name) private readonly RegulatorModel: Model<RegulatorDocument>) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getAll(query: SiteRegulatorGetAllQuery) {
    const options: FilterQuery<RegulatorDocument> = { lang: query.lang };
    const sort: Record<string, SortOrder> = {};

    if (query?.sort) {
      if (query.sort !== SortWithDefaultEnum.DEFAULT) sort.rating = query.sort;
      else sort.createdAt = -1;
    }

    if (query?.search) options.name = { $regex: query.search, $options: "i" };

    const skip = query.size * (query.page - 1);
    const regulators = await this.RegulatorModel.find(options).populate("logo").sort(sort).skip(skip).limit(query.size);
    const total = await this.RegulatorModel.count(options);

    return { data: regulators, total };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getOne(params: SlugDto, query: LangDto) {
    const regulator = await this.RegulatorModel.findOne({ slug: params.slug, lang: query.lang })
      .populate("logo")
      .populate({
        path: "reviews",
        match: { isApproved: true },
        options: { sort: { createdAt: -1 } }
      });

    return regulator;
  }
}
