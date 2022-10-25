import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { SWAGGER_FILE_BODY } from "@common/constants";
import {
  ApiResponseDto,
  FileUploadBody,
  MongoIdDto,
  NewsCreateBody,
  NewsGetAllQuery,
  NewsUpdateBody
} from "@common/declarations";
import { Auth } from "@common/decorators";
import { News } from "@common/models";

import { NewsService } from "./news.service";

@Controller()
@ApiTags("admin/news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @Get()
  @ApiOkResponse({ type: [News] })
  getAll(@Query() query: NewsGetAllQuery) {
    return this.newsService.getAll(query);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @Get(":id")
  @ApiOkResponse({ type: News })
  getOne(@Param() params: MongoIdDto) {
    return this.newsService.getOne(params);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @HttpCode(200)
  @Post()
  @ApiOkResponse({ type: ApiResponseDto })
  create(@Body() body: NewsCreateBody) {
    return this.newsService.create(body);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @HttpCode(200)
  @Put(":id")
  @ApiOkResponse({ type: ApiResponseDto })
  update(@Param() params: MongoIdDto, @Body() body: NewsUpdateBody) {
    return this.newsService.update(params, body);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @Delete(":id")
  @ApiOkResponse({ type: ApiResponseDto })
  delete(@Param() params: MongoIdDto) {
    return this.newsService.delete(params);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @HttpCode(200)
  @Post("upload/poster")
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data")
  @ApiBody(SWAGGER_FILE_BODY)
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: FileUploadBody) {
    return this.newsService.upload(file, body);
  }
}
