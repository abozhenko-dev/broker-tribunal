import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import {
  FeedbackComplaintBody,
  FeedbackConsultationBody,
  FeedbackPromotionBody,
  FeedbackTypesEnum,
  HttpStatusMessages
} from "@common/declarations";
import { Feedback, FeedbackDocument } from "@common/models";
import { MailService } from "@common/services";

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name) private readonly FeedbackModel: Model<FeedbackDocument>,
    private readonly mailService: MailService
  ) {}

  async consultation(body: FeedbackConsultationBody) {
    await this.FeedbackModel.create({ ...body, type: FeedbackTypesEnum.CONSULTATION });
    await this.mailService.consultation(body);
    return { message: HttpStatusMessages.OK };
  }

  async complaint(body: FeedbackComplaintBody) {
    await this.FeedbackModel.create({ ...body, type: FeedbackTypesEnum.COMPLAINT });
    await this.mailService.complaint(body);
    return { message: HttpStatusMessages.OK };
  }

  async promotion(body: FeedbackPromotionBody) {
    await this.FeedbackModel.create({ ...body, type: FeedbackTypesEnum.PROMOTION });
    await this.mailService.promotion(body);
    return { message: HttpStatusMessages.OK };
  }
}
