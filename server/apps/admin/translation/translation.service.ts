import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import axios, { AxiosInstance } from "axios";

import { HttpStatusMessages, LangDto, TranslationUpdateBody } from "@common/declarations";

@Injectable()
export class TranslationService {
  api: AxiosInstance;
  storage: AxiosInstance;
  rootDir = "translations";

  constructor(private readonly configService: ConfigService) {
    const apiUrl = this.configService.get("BUCKET_API_URL");
    const apiAccessKey = this.configService.get("BUCKET_API_ACCESS_KEY");

    const storageUrl = this.configService.get("BUCKET_STORAGE_URL");
    const storageAccessKey = this.configService.get("BUCKET_STORAGE_ACCESS_KEY");

    this.api = axios.create({
      baseURL: apiUrl,
      headers: {
        AccessKey: apiAccessKey
      }
    });

    this.storage = axios.create({
      baseURL: storageUrl,
      headers: {
        AccessKey: storageAccessKey,
        "Content-Type": "application/octet-stream"
      }
    });
  }

  async getOne(query: LangDto) {
    try {
      const resp = await this.storage.get(`${this.rootDir}/${query.lang || "en"}.json`, { headers: { Accept: "*/*" } });
      return resp.data;
    } catch (error) {
      throw new HttpException(HttpStatusMessages.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(body: TranslationUpdateBody) {
    try {
      const url = `${this.rootDir}/${body.lang}.json`;
      await this.storage.put(url, Buffer.from(JSON.stringify(body.translations)));
      await this.api.post("/purge", {}, { params: { url: `${this.configService.get("BUCKET_PULL_ZONE")}/${url}` } });
      return { message: HttpStatusMessages.OK };
    } catch (error) {
      throw new HttpException(HttpStatusMessages.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
