import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import {
  ApiResponseDto,
  ArticleTagCreateBody,
  ArticleTagGetAllQueryDto,
  ArticleTagUpdateBody,
  MongoIdDto
} from "@common/declarations";
import { Auth } from "@common/decorators";
import { ArticleTag } from "@common/models";

import { BlogTagService } from "./blog-tag.service";

@Controller()
@ApiTags("admin/blog-tags")
export class BlogTagController {
  constructor(private readonly blogTagService: BlogTagService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @Get()
  @ApiOkResponse({ type: [ArticleTag] })
  getAll(@Query() query: ArticleTagGetAllQueryDto) {
    return this.blogTagService.getAll(query);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @Get(":id")
  @ApiOkResponse({ type: ArticleTag })
  getOne(@Param() params: MongoIdDto) {
    return this.blogTagService.getOne(params);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @HttpCode(200)
  @Post()
  @ApiOkResponse({ type: ApiResponseDto })
  create(@Body() body: ArticleTagCreateBody) {
    return this.blogTagService.create(body);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @HttpCode(200)
  @Put(":id")
  @ApiOkResponse({ type: ApiResponseDto })
  update(@Param() params: MongoIdDto, @Body() body: ArticleTagUpdateBody) {
    return this.blogTagService.update(params, body);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @Delete(":id")
  @ApiOkResponse({ type: ApiResponseDto })
  delete(@Param() params: MongoIdDto) {
    return this.blogTagService.delete(params);
  }
}
