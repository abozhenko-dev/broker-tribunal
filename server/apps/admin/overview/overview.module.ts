import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { File, FileModel, Overview, OverviewModel } from "@common/models";
import { BucketService } from "@common/services";

import { OverviewController } from "./overview.controller";

import { OverviewService } from "./overview.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Overview.name, schema: OverviewModel },
      { name: File.name, schema: FileModel }
    ])
  ],
  controllers: [OverviewController],
  providers: [OverviewService, BucketService]
})
export class AdminOverviewModule {}
