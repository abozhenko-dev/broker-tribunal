import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { ApiResponseDto, ReviewCreateBody } from "@common/declarations";
import { Review } from "@common/models";

import { ReviewService } from "./review.service";

@Controller()
@ApiTags("site/reviews")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Get()
  @ApiOkResponse({ type: [Review] })
  getAll() {
    return this.reviewService.getAll();
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @HttpCode(200)
  @Post()
  @ApiOkResponse({ type: ApiResponseDto })
  create(@Body() body: ReviewCreateBody) {
    return this.reviewService.create(body);
  }
}
