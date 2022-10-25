import { Body, Controller, Get, HttpCode, Put, Query } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { ApiResponseDto, LangDto, TranslationUpdateBody } from "@common/declarations";
import { Auth } from "@common/decorators";

import { TranslationService } from "./translation.service";

@Controller()
@ApiTags("admin/translations")
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @Get()
  @ApiOkResponse()
  getOne(@Query() query: LangDto) {
    return this.translationService.getOne(query);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @HttpCode(200)
  @Put()
  @ApiOkResponse({ type: ApiResponseDto })
  update(@Body() body: TranslationUpdateBody) {
    return this.translationService.update(body);
  }
}
