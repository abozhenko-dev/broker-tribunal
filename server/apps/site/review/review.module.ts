import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Broker, BrokerModel, Regulator, RegulatorModel, Review, ReviewModel } from "@common/models";

import { ReviewController } from "./review.controller";

import { ReviewService } from "./review.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewModel },
      { name: Broker.name, schema: BrokerModel },
      { name: Regulator.name, schema: RegulatorModel }
    ])
  ],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class SiteReviewModule {}
