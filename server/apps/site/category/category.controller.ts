import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { CategoryGetAllQuery, CategoryGetOneQuery, SlugDto } from "@common/declarations";
import { Category } from "@common/models";

import { CategoryService } from "./category.service";

@Controller()
@ApiTags("site/categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Get()
  @ApiOkResponse({ type: [Category] })
  getAll(@Query() query: CategoryGetAllQuery) {
    return this.categoryService.getAll(query);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Get(":slug")
  @ApiOkResponse({ type: Category })
  getOne(@Param() params: SlugDto, @Query() query: CategoryGetOneQuery) {
    return this.categoryService.getOne(params, query);
  }
}
