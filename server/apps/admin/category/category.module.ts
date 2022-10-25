import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Broker, BrokerModel, Category, CategoryModel } from "@common/models";

import { CategoryController } from "./category.controller";

import { CategoryService } from "./category.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategoryModel },
      { name: Broker.name, schema: BrokerModel }
    ])
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class AdminCategoryModule {}
