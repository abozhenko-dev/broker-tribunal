import { Body, Controller, Delete, Get, HttpCode, Post, Put } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { ApiResponseDto, SeoCreateBody, SeoUpdateBody } from "@common/declarations";
import { Auth } from "@common/decorators";
import { Seo } from "@common/models";

import { SeoService } from "./seo.service";

@Controller()
@ApiTags("admin/seo")
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @Get()
  @ApiOkResponse({ type: Seo })
  getOne() {
    return this.seoService.getOne();
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @HttpCode(200)
  @Post()
  @ApiOkResponse({ type: ApiResponseDto })
  create(@Body() body: SeoCreateBody) {
    return this.seoService.create(body);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @HttpCode(200)
  @Put()
  @ApiOkResponse({ type: ApiResponseDto })
  update(@Body() body: SeoUpdateBody) {
    return this.seoService.update(body);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @Delete()
  @ApiOkResponse({ type: ApiResponseDto })
  delete() {
    return this.seoService.delete();
  }
}
