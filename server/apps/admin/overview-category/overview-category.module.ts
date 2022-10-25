import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Overview, OverviewCategory, OverviewCategoryModel, OverviewModel } from "@common/models";

import { OverviewCategoryController } from "./overview-category.controller";

import { OverviewCategoryService } from "./overview-category.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OverviewCategory.name, schema: OverviewCategoryModel },
      { name: Overview.name, schema: OverviewModel }
    ])
  ],
  controllers: [OverviewCategoryController],
  providers: [OverviewCategoryService]
})
export class AdminOverviewCategoryModule {}
