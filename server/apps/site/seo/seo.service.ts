import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import { Seo, SeoDocument } from "@common/models";

@Injectable()
export class SeoService {
  constructor(@InjectModel(Seo.name) private readonly SeoModel: Model<SeoDocument>) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getOne() {
    const seo = await this.SeoModel.findOne();
    return seo;
  }
}
