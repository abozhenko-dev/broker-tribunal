import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Broker, BrokerModel } from "@common/models";

import { BrokerController } from "./broker.controller";

import { BrokerService } from "./broker.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Broker.name, schema: BrokerModel }])],
  controllers: [BrokerController],
  providers: [BrokerService]
})
export class SiteBrokerModule {}
