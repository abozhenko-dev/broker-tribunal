import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { LangDto, NewsGetAllQuery, SlugDto } from "@common/declarations";
import { News } from "@common/models";

import { NewsService } from "./news.service";

@Controller()
@ApiTags("site/news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Get()
  @ApiOkResponse({ type: [News] })
  getAll(@Query() query: NewsGetAllQuery) {
    return this.newsService.getAll(query);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Get("last")
  @ApiOkResponse({ type: [News] })
  getLast(@Query() query: LangDto) {
    return this.newsService.getLast(query);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Get(":slug")
  @ApiOkResponse({ type: News })
  getOne(@Param() params: SlugDto, @Query() query: LangDto) {
    return this.newsService.getOne(params, query);
  }
}
