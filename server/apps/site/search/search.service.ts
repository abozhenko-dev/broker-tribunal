import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import { SearchGetAllQuery } from "@common/declarations";
import { Broker, BrokerDocument, Regulator, RegulatorDocument } from "@common/models";

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Broker.name) private readonly BrokerModel: Model<BrokerDocument>,
    @InjectModel(Regulator.name) private readonly RegulatorModel: Model<RegulatorDocument>
  ) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getAll(query: SearchGetAllQuery) {
    const brokers = await this.BrokerModel.find({ lang: query.lang, name: { $regex: query.filter, $options: "i" } })
      .limit(5)
      .populate("logo")
      .lean();

    const regulators = await this.RegulatorModel.find({ lang: query.lang, name: { $regex: query.filter, $options: "i" } })
      .limit(5)
      .populate("logo")
      .lean();

    return [...brokers, ...regulators];
  }
}
