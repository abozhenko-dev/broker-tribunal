import { Controller, Get, Query } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { ArticleTagGetAllQueryDto } from "@common/declarations";
import { ArticleTag } from "@common/models";

import { BlogTagService } from "./blog-tag.service";

@Controller()
@ApiTags("site/blog-tags")
export class BlogTagController {
  constructor(private readonly blogTagService: BlogTagService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Get()
  @ApiOkResponse({ type: [ArticleTag] })
  getAll(@Query() query: ArticleTagGetAllQueryDto) {
    return this.blogTagService.getAll(query);
  }
}
