import { Body, Controller, Delete, HttpCode, Param, Put } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { ApiTags } from "@nestjs/swagger";

import { FileUpdateBody, MongoIdDto } from "@common/declarations";
import { Auth } from "@common/decorators";
import { BucketService } from "@common/services";

@Controller()
@ApiTags("admin/bucket")
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @HttpCode(200)
  @Put(":id")
  update(@Param() params: MongoIdDto, @Body() body: FileUpdateBody) {
    return this.bucketService.update(params.id, body);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @Delete(":id")
  delete(@Param() params: MongoIdDto) {
    return this.bucketService.deleteById(params.id);
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  @Auth()
  @Cron("0 0 4 * * *")
  clean() {
    return this.bucketService.clean();
  }
}
