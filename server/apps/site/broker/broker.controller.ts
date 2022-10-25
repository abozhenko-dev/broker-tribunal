import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { BrokerGetAllQuery, LangDto, SlugDto } from "@common/declarations";
import { Broker } from "@common/models";

import { BrokerService } from "./broker.service";

@Controller()
@ApiTags("site/brokers")
export class BrokerController {
  constructor(private readonly brokerService: BrokerService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Get()
  @ApiOkResponse({ type: [Broker] })
  getAll(@Query() query: BrokerGetAllQuery) {
    return this.brokerService.getAll(query);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Get("new")
  @ApiOkResponse({ type: [Broker] })
  getNew(@Query() query: LangDto) {
    return this.brokerService.getNew(query);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Get(":slug")
  @ApiOkResponse({ type: Broker })
  getOne(@Param() params: SlugDto, @Query() query: LangDto) {
    return this.brokerService.getOne(params, query);
  }
}
