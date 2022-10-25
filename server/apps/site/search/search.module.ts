import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Broker, BrokerModel, Regulator, RegulatorModel } from "common/models";

import { SearchController } from "./search.controller";

import { SearchService } from "./search.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Broker.name, schema: BrokerModel },
      { name: Regulator.name, schema: RegulatorModel }
    ])
  ],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SiteSearchModule {}
