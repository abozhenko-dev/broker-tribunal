import { Body, Controller, Get, HttpCode, Post, Put } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { ApiResponseDto, ContactCreateBody, ContactUpdateBody } from "@common/declarations";
import { Auth } from "@common/decorators";
import { Contact } from "@common/models";

import { ContactService } from "./contact.service";

@Controller()
@ApiTags("admin/contacts")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @Get()
  @ApiOkResponse({ type: Contact })
  getOne() {
    return this.contactService.getOne();
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @HttpCode(200)
  @Post()
  @ApiOkResponse({ type: ApiResponseDto })
  create(@Body() body: ContactCreateBody) {
    return this.contactService.create(body);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @HttpCode(200)
  @Put()
  @ApiOkResponse({ type: ApiResponseDto })
  update(@Body() body: ContactUpdateBody) {
    return this.contactService.update(body);
  }
}
