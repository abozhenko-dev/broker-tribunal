import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";

import { SitemapService } from "./sitemap.service";

@Controller()
export class SitemapController {
  constructor(private readonly sitemapService: SitemapService) {}

  @Get()
  @ApiOkResponse()
  getOne() {
    return this.sitemapService.getOne();
  }
}
