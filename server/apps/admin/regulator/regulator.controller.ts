import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { SWAGGER_FILE_BODY } from "@common/constants";
import {
  AdminRegulatorGetAllQuery,
  ApiResponseDto,
  FileUploadBody,
  MongoIdDto,
  RegulatorCreateBody,
  RegulatorUpdateBody
} from "@common/declarations";
import { Auth } from "@common/decorators";
import { Regulator } from "@common/models";

import { RegulatorService } from "./regulator.service";

@Controller()
@ApiTags("admin/regulators")
export class RegulatorController {
  constructor(private readonly regulatorService: RegulatorService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @Get()
  @ApiOkResponse({ type: [Regulator] })
  getAll(@Query() query: AdminRegulatorGetAllQuery) {
    return this.regulatorService.getAll(query);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @Get(":id")
  @ApiOkResponse({ type: Regulator })
  getOne(@Param() params: MongoIdDto) {
    return this.regulatorService.getOne(params);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @HttpCode(200)
  @Post()
  @ApiOkResponse({ type: ApiResponseDto })
  create(@Body() body: RegulatorCreateBody) {
    return this.regulatorService.create(body);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @HttpCode(200)
  @Put(":id")
  @ApiOkResponse({ type: ApiResponseDto })
  update(@Param() params: MongoIdDto, @Body() body: RegulatorUpdateBody) {
    return this.regulatorService.update(params, body);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @Delete(":id")
  @ApiOkResponse({ type: ApiResponseDto })
  delete(@Param() params: MongoIdDto) {
    return this.regulatorService.delete(params);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @HttpCode(200)
  @Post("upload/logo")
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data")
  @ApiBody(SWAGGER_FILE_BODY)
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: FileUploadBody) {
    return this.regulatorService.upload(file, body);
  }
}
