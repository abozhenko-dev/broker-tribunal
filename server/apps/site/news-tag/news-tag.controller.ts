import { Controller, Get, Query } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { NewsTagGetAllQueryDto } from "@common/declarations";
import { NewsTag } from "@common/models";

import { NewsTagService } from "./news-tag.service";

@Controller()
@ApiTags("site/news-tags")
export class NewsTagController {
  constructor(private readonly newsTagService: NewsTagService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Get()
  @ApiOkResponse({ type: [NewsTag] })
  getAll(@Query() query: NewsTagGetAllQueryDto) {
    return this.newsTagService.getAll(query);
  }
}
