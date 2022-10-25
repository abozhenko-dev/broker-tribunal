import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { FilterQuery, Model } from "mongoose";

import { BrokerGetAllQuery, LangDto, SlugDto } from "@common/declarations";
import { Broker, BrokerDocument } from "@common/models";

@Injectable()
export class BrokerService {
  constructor(@InjectModel(Broker.name) private readonly BrokerModel: Model<BrokerDocument>) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getAll(query: BrokerGetAllQuery) {
    const options: FilterQuery<BrokerDocument> = { lang: query.lang, isInCatalog: true };

    const skip = query.size * (query.page - 1);
    const brokers = await this.BrokerModel.find(options).populate("logo").skip(skip).limit(query.size);
    const total = await this.BrokerModel.count(options);

    return { data: brokers, total };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getNew(query: LangDto) {
    const brokers = await this.BrokerModel.find({ lang: query.lang, isInCatalog: true })
      .populate("logo")
      .sort({ createdAt: -1 })
      .limit(6);

    return brokers;
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getOne(params: SlugDto, query: LangDto) {
    const broker = await this.BrokerModel.findOne({ slug: params.slug, lang: query.lang })
      .populate("logo")
      .populate({
        path: "reviews",
        match: { isApproved: true },
        options: { sort: { createdAt: -1 } }
      });

    return broker;
  }
}
