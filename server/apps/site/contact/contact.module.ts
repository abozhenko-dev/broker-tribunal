import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Contact, ContactModel } from "@common/models";

import { ContactController } from "./contact.controller";

import { ContactService } from "./contact.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Contact.name, schema: ContactModel }])],
  controllers: [ContactController],
  providers: [ContactService]
})
export class SiteContactModule {}
