import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { LangDto, OverviewCategoryGetAllQuery, OverviewCategoryGetOneQuery, SlugDto } from "@common/declarations";
import { OverviewCategory } from "@common/models";

import { OverviewCategoryService } from "./overview-category.service";

@Controller()
@ApiTags("site/overview-category")
export class OverviewCategoryController {
  constructor(private readonly overviewCategoryService: OverviewCategoryService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Get()
  @ApiOkResponse({ type: [OverviewCategory] })
  getAll(@Query() query: OverviewCategoryGetAllQuery) {
    return this.overviewCategoryService.getAll(query);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Get("main")
  @ApiOkResponse({ type: OverviewCategory })
  getMain(@Query() query: LangDto) {
    return this.overviewCategoryService.getMain(query);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Get(":slug")
  @ApiOkResponse({ type: OverviewCategory })
  getOne(@Param() params: SlugDto, @Query() query: OverviewCategoryGetOneQuery) {
    return this.overviewCategoryService.getOne(params, query);
  }
}
