import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { ApiResponseDto, FeedbackComplaintBody, FeedbackConsultationBody, FeedbackPromotionBody } from "@common/declarations";

import { FeedbackService } from "./feedback.service";

@Controller()
@ApiTags("site/translations")
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @HttpCode(200)
  @Post("consultation")
  @ApiOkResponse({ type: ApiResponseDto })
  consultation(@Body() body: FeedbackConsultationBody) {
    return this.feedbackService.consultation(body);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @HttpCode(200)
  @Post("complaint")
  @ApiOkResponse({ type: ApiResponseDto })
  complaint(@Body() body: FeedbackComplaintBody) {
    return this.feedbackService.complaint(body);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @HttpCode(200)
  @Post("promotion")
  @ApiOkResponse({ type: ApiResponseDto })
  promotion(@Body() body: FeedbackPromotionBody) {
    return this.feedbackService.promotion(body);
  }
}
