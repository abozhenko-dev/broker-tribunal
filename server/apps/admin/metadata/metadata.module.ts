import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Metadata, MetadataModel } from "@common/models";

import { MetadataController } from "./metadata.controller";

import { MetadataService } from "./metadata.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Metadata.name, schema: MetadataModel }])],
  controllers: [MetadataController],
  providers: [MetadataService]
})
export class AdminMetadataModule {}
