/* eslint-disable no-console */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";

import axios, { AxiosInstance } from "axios";
import { Model, Types } from "mongoose";

import { FileUpdateBody, FileUploadBody, HttpStatusMessages, IFile } from "@common/declarations";
import { FileDocument } from "@common/models";

@Injectable()
export class BucketService {
  storage: AxiosInstance;

  constructor(
    @InjectModel("File") private readonly FileModel: Model<FileDocument>,
    private readonly configService: ConfigService
  ) {
    const baseURL = this.configService.get("BUCKET_STORAGE_URL");
    const accessKey = this.configService.get("BUCKET_STORAGE_ACCESS_KEY");

    this.storage = axios.create({
      baseURL,
      headers: {
        AccessKey: accessKey,
        "Content-Type": "application/octet-stream"
      }
    });
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getOne(id: Types.ObjectId) {
    try {
      const file = await this.FileModel.findById(id);
      const resp = await this.storage.get(file.link, { headers: { Accept: "*/*" } });

      return resp;
    } catch (error) {
      throw new HttpException(HttpStatusMessages.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async upload(file: Express.Multer.File, body: FileUploadBody, directory: string) {
    try {
      const fileName = file.originalname;
      const link = `${directory}/${fileName}`;

      await this.storage.put(link, file.buffer);

      const response = await this.FileModel.create({ link, meta: { ...body, type: file.mimetype.split("/")[0] } });

      return response;
    } catch (error) {
      throw new HttpException(HttpStatusMessages.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async approve(files: string[]) {
    const ids = files.filter(Boolean);
    if (ids?.length) await this.FileModel.updateMany({ _id: ids }, { isApproved: true });
    return { message: HttpStatusMessages.OK };
  }

  async update(id: string, body: FileUpdateBody) {
    await this.FileModel.findByIdAndUpdate(id, body);
    return { message: HttpStatusMessages.OK };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async deleteById(id: string) {
    try {
      const file = await this.FileModel.findByIdAndDelete(id);
      const exist = await this.FileModel.exists({ link: file.link });
      if (!exist) await this.storage.delete(file.link);

      return { message: HttpStatusMessages.OK };
    } catch (error) {
      throw new HttpException(HttpStatusMessages.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async deleteMany(files: IFile[]) {
    try {
      for (const file of files) {
        const deletedFile = await this.FileModel.findByIdAndDelete(file._id);
        console.log(deletedFile);
        const exist = await this.FileModel.exists({ link: deletedFile.link });
        if (!exist) await this.storage.delete(deletedFile.link);
      }

      return { message: HttpStatusMessages.OK };
    } catch (error) {
      throw new HttpException(HttpStatusMessages.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async clean() {
    const files = await this.FileModel.find({ isApproved: false }).lean();
    await this.deleteMany(files);

    return { message: HttpStatusMessages.OK };
  }
}
