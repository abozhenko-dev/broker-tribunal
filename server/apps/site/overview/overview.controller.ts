import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { LangDto, SlugDto } from "@common/declarations";
import { Overview } from "@common/models";

import { OverviewService } from "./overview.service";

@Controller()
@ApiTags("site/overviews")
export class OverviewController {
  constructor(private readonly overviewService: OverviewService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Get(":slug")
  @ApiOkResponse({ type: Overview })
  getOne(@Param() params: SlugDto, @Query() query: LangDto) {
    return this.overviewService.getOne(params, query);
  }
}
