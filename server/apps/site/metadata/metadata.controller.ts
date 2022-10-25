import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { LangDto, SlugDto } from "@common/declarations";
import { Metadata } from "@common/models";

import { MetadataService } from "./metadata.service";

@Controller()
@ApiTags("site/metadata")
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Get(":slug")
  @ApiOkResponse({ type: Metadata })
  getOne(@Param() params: SlugDto, @Query() query: LangDto) {
    return this.metadataService.getOne(params, query);
  }
}
