import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { MailMessage, Mailman } from "@squareboat/nest-mailman";

import { FeedbackComplaintBody, FeedbackConsultationBody, FeedbackPromotionBody, HttpStatusMessages } from "@common/declarations";

@Injectable()
export class MailService {
  mail: Mailman;
  adminEmail: string;

  constructor(private readonly configService: ConfigService) {
    this.mail = Mailman.init();
    this.adminEmail = this.configService.get("MAIL_ADMIN");
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async consultation(body: FeedbackConsultationBody) {
    const mail = MailMessage.init().subject("Broker Tribunal: консультация").view("consultation", body);
    await this.mail.to(this.adminEmail).send(mail);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async complaint(body: FeedbackComplaintBody) {
    const mail = MailMessage.init().subject("Broker Tribunal: жалоба").view("complaint", body);
    await this.mail.to(this.adminEmail).send(mail);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async promotion(body: FeedbackPromotionBody) {
    const mail = MailMessage.init().subject("Broker Tribunal: реклама").view("promotion", body);
    await this.mail.to(this.adminEmail).send(mail);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async reset(body: { link: string; email: string }) {
    const mail = MailMessage.init().subject("Broker Tribunal: сброс пароля").view("reset", body);
    await this.mail.to(body.email).send(mail);
    return { message: HttpStatusMessages.OK };
  }
}
