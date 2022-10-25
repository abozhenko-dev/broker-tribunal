import { ICompany } from "@declarations";

import { $api } from "./axios.service";

export class BrokersService {
  static getOne(slug: string, lang: string) {
    return $api.get<ICompany>(`/brokers/${slug}`, {
      params: {
        lang
      }
    });
  }

  static getAll(params: any) {
    return $api.get<ICompany[]>("/brokers", {
      params
    });
  }

  static new(lang: string) {
    return $api.get<ICompany[]>("/brokers/new", {
      params: {
        lang
      }
    });
  }
}
