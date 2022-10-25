import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { ApiResponseDto, MongoIdDto, ReviewApproveBody, ReviewGetAllQuery } from "@common/declarations";
import { Auth } from "@common/decorators";
import { Review } from "@common/models";

import { ReviewService } from "./review.service";

@Controller()
@ApiTags("admin/reviews")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @Get()
  @ApiOkResponse({ type: [Review] })
  getAll(@Query() query: ReviewGetAllQuery) {
    return this.reviewService.getAll(query);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @HttpCode(200)
  @Post("approve")
  @ApiOkResponse({ type: ApiResponseDto })
  approve(@Body() body: ReviewApproveBody) {
    return this.reviewService.approve(body);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @Delete(":id")
  @ApiOkResponse({ type: ApiResponseDto })
  delete(@Param() params: MongoIdDto) {
    return this.reviewService.delete(params);
  }
}
