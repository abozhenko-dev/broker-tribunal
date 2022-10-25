import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { ArticleGetAllQuery, LangDto, SlugDto } from "@common/declarations";
import { Article } from "@common/models";

import { BlogService } from "./blog.service";

@Controller()
@ApiTags("site/blog")
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Get()
  @ApiOkResponse({ type: [Article] })
  getAll(@Query() query: ArticleGetAllQuery) {
    return this.blogService.getAll(query);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Get(":slug")
  @ApiOkResponse({ type: Article })
  getOne(@Param() params: SlugDto, @Query() query: LangDto) {
    return this.blogService.getOne(params, query);
  }
}
