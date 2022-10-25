import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { Seo } from "@common/models";

import { SeoService } from "./seo.service";

@Controller()
@ApiTags("site/seo")
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Get()
  @ApiOkResponse({ type: Seo })
  getOne() {
    return this.seoService.getOne();
  }
}
