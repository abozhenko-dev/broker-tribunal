import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";

import { MailMessage, Mailman } from "@squareboat/nest-mailman";
import { Model } from "mongoose";

import {
  FeedbackComplaintBody,
  FeedbackConsultationBody,
  FeedbackPromotionBody,
  FeedbackTypesEnum,
  HttpStatusMessages
} from "@common/declarations";
import { Feedback, FeedbackDocument } from "@common/models";

@Injectable()
export class FeedbackService {
  mail: Mailman;
  adminEmail: string;

  constructor(
    @InjectModel(Feedback.name) private readonly FeedbackModel: Model<FeedbackDocument>,
    private readonly configService: ConfigService
  ) {
    this.mail = Mailman.init();
    this.adminEmail = this.configService.get("MAIL_ADMIN");
  }

  async consultation(body: FeedbackConsultationBody) {
    const mail = MailMessage.init().subject("Broker Tribunal: консультация").view("consultation", body);
    await this.FeedbackModel.create({ ...body, type: FeedbackTypesEnum.CONSULTATION });
    await this.mail.to(this.adminEmail).send(mail);
    return { message: HttpStatusMessages.OK };
  }

  async complaint(body: FeedbackComplaintBody) {
    const mail = MailMessage.init().subject("Broker Tribunal: жалоба").view("complaint", body);
    await this.FeedbackModel.create({ ...body, type: FeedbackTypesEnum.COMPLAINT });
    await this.mail.to(this.adminEmail).send(mail);
    return { message: HttpStatusMessages.OK };
  }

  async promotion(body: FeedbackPromotionBody) {
    const mail = MailMessage.init().subject("Broker Tribunal: реклама").view("promotion", body);
    await this.FeedbackModel.create({ ...body, type: FeedbackTypesEnum.PROMOTION });
    await this.mail.to(this.adminEmail).send(mail);
    return { message: HttpStatusMessages.OK };
  }
}
