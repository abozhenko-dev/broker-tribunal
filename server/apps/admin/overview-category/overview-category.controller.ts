import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import {
  ApiResponseDto,
  MongoIdDto,
  OverviewCategoryCreateBody,
  OverviewCategoryGetAllQuery,
  OverviewCategoryUpdateBody
} from "@common/declarations";
import { Auth } from "@common/decorators";
import { OverviewCategory } from "@common/models";

import { OverviewCategoryService } from "./overview-category.service";

@Controller()
@ApiTags("admin/overview-category")
export class OverviewCategoryController {
  constructor(private readonly overviewCategoryService: OverviewCategoryService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @Get()
  @ApiOkResponse({ type: [OverviewCategory] })
  getAll(@Query() query: OverviewCategoryGetAllQuery) {
    return this.overviewCategoryService.getAll(query);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @Get(":id")
  @ApiOkResponse({ type: OverviewCategory })
  getOne(@Param() params: MongoIdDto) {
    return this.overviewCategoryService.getOne(params);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @HttpCode(200)
  @Post()
  @ApiOkResponse({ type: ApiResponseDto })
  create(@Body() body: OverviewCategoryCreateBody) {
    return this.overviewCategoryService.create(body);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @HttpCode(200)
  @Put(":id")
  @ApiOkResponse({ type: ApiResponseDto })
  update(@Param() params: MongoIdDto, @Body() body: OverviewCategoryUpdateBody) {
    return this.overviewCategoryService.update(params, body);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @Delete(":id")
  @ApiOkResponse({ type: ApiResponseDto })
  delete(@Param() params: MongoIdDto) {
    return this.overviewCategoryService.delete(params);
  }
}
