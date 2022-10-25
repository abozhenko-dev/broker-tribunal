import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import { ContactCreateBody, ContactUpdateBody, HttpStatusMessages } from "@common/declarations";
import { Contact, ContactDocument } from "@common/models";

@Injectable()
export class ContactService {
  constructor(@InjectModel(Contact.name) private readonly ContactModel: Model<ContactDocument>) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getOne() {
    const contacts = await this.ContactModel.findOne();
    return contacts;
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async create(body: ContactCreateBody) {
    await this.ContactModel.create(body);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async update(body: ContactUpdateBody) {
    await this.ContactModel.findOneAndUpdate({}, body);
    return { message: HttpStatusMessages.OK };
  }
}
