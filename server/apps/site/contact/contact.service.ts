import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import { Contact, ContactDocument } from "@common/models";

@Injectable()
export class ContactService {
  constructor(@InjectModel(Contact.name) private readonly ContactModel: Model<ContactDocument>) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getOne() {
    const contacts = await this.ContactModel.findOne();
    return contacts;
  }
}
