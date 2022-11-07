import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Feedback, FeedbackModel } from "@common/models";
import { MailService } from "@common/services";

import { FeedbackController } from "./feedback.controller";

import { FeedbackService } from "./feedback.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Feedback.name, schema: FeedbackModel }])],
  controllers: [FeedbackController],
  providers: [FeedbackService, MailService]
})
export class SiteFeedbackModule {}
