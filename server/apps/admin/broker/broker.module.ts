import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Broker, BrokerModel, File, FileModel, Review, ReviewModel } from "@common/models";
import { BucketService } from "@common/services";

import { BrokerController } from "./broker.controller";

import { BrokerService } from "./broker.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Broker.name, schema: BrokerModel },
      { name: Review.name, schema: ReviewModel },
      { name: File.name, schema: FileModel }
    ])
  ],
  controllers: [BrokerController],
  providers: [BrokerService, BucketService]
})
export class AdminBrokerModule {}
