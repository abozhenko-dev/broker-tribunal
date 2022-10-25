import { Controller, Get, Query } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { FeedbackGetAllQuery } from "@common/declarations";
import { Auth } from "@common/decorators";
import { Feedback } from "@common/models";

import { FeedbackService } from "./feedback.service";

@Controller()
@ApiTags("admin/feedback")
export class FeedbackController {
  constructor(private readonly categoryService: FeedbackService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @Get()
  @ApiOkResponse({ type: [Feedback] })
  getAll(@Query() query: FeedbackGetAllQuery) {
    return this.categoryService.getAll(query);
  }
}
