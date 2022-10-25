import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { Contact } from "@common/models";

import { ContactService } from "./contact.service";

@Controller()
@ApiTags("site/contacts")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Get()
  @ApiOkResponse({ type: Contact })
  getOne() {
    return this.contactService.getOne();
  }
}
