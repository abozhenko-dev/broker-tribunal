import { Controller, Get, Query } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { SearchGetAllQuery } from "@common/declarations";
import { Broker } from "@common/models";

import { SearchService } from "./search.service";

@Controller()
@ApiTags("site/search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Get()
  @ApiOkResponse({ type: [Broker] })
  getAll(@Query() query: SearchGetAllQuery) {
    return this.searchService.getAll(query);
  }
}
