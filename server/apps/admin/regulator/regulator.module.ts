import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { File, FileModel, Regulator, RegulatorModel, Review, ReviewModel } from "@common/models";
import { BucketService } from "@common/services";

import { RegulatorController } from "./regulator.controller";

import { RegulatorService } from "./regulator.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Regulator.name, schema: RegulatorModel },
      { name: Review.name, schema: ReviewModel },
      { name: File.name, schema: FileModel }
    ])
  ],
  controllers: [RegulatorController],
  providers: [RegulatorService, BucketService]
})
export class AdminRegulatorModule {}
