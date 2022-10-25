import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { File, FileModel } from "@common/models";
import { BucketService } from "@common/services";

import { BucketController } from "./bucket.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: File.name, schema: FileModel }])],
  controllers: [BucketController],
  providers: [BucketService]
})
export class AdminBucketModule {}
