import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Overview, OverviewModel } from "@common/models";

import { OverviewController } from "./overview.controller";

import { OverviewService } from "./overview.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Overview.name, schema: OverviewModel }])],
  controllers: [OverviewController],
  providers: [OverviewService]
})
export class SiteOverviewModule {}
