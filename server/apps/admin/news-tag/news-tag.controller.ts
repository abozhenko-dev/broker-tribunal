import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { ApiResponseDto, MongoIdDto, NewsTagCreateBody, NewsTagGetAllQueryDto, NewsTagUpdateBody } from "@common/declarations";
import { Auth } from "@common/decorators";
import { NewsTag } from "@common/models";

import { NewsTagService } from "./news-tag.service";

@Controller()
@ApiTags("admin/news-tags")
export class NewsTagController {
  constructor(private readonly newsTagService: NewsTagService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @Get()
  @ApiOkResponse({ type: [NewsTag] })
  getAll(@Query() query: NewsTagGetAllQueryDto) {
    return this.newsTagService.getAll(query);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @Get(":id")
  @ApiOkResponse({ type: NewsTag })
  getOne(@Param() params: MongoIdDto) {
    return this.newsTagService.getOne(params);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @HttpCode(200)
  @Post()
  @ApiOkResponse({ type: ApiResponseDto })
  create(@Body() body: NewsTagCreateBody) {
    return this.newsTagService.create(body);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @HttpCode(200)
  @Put(":id")
  @ApiOkResponse({ type: ApiResponseDto })
  update(@Param() params: MongoIdDto, @Body() body: NewsTagUpdateBody) {
    return this.newsTagService.update(params, body);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @Delete(":id")
  @ApiOkResponse({ type: ApiResponseDto })
  delete(@Param() params: MongoIdDto) {
    return this.newsTagService.delete(params);
  }
}
