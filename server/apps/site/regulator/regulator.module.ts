import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Regulator, RegulatorModel } from "@common/models";

import { RegulatorController } from "./regulator.controller";

import { RegulatorService } from "./regulator.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Regulator.name, schema: RegulatorModel }])],
  controllers: [RegulatorController],
  providers: [RegulatorService]
})
export class SiteRegulatorModule {}
