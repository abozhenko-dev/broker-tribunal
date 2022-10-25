import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { LangDto, SiteRegulatorGetAllQuery, SlugDto } from "@common/declarations";
import { Regulator } from "@common/models";

import { RegulatorService } from "./regulator.service";

@Controller()
@ApiTags("site/regulators")
export class RegulatorController {
  constructor(private readonly regulatorService: RegulatorService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Get()
  @ApiOkResponse({ type: [Regulator] })
  getAll(@Query() query: SiteRegulatorGetAllQuery) {
    return this.regulatorService.getAll(query);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Get(":slug")
  @ApiOkResponse({ type: Regulator })
  getOne(@Param() params: SlugDto, @Query() query: LangDto) {
    return this.regulatorService.getOne(params, query);
  }
}
