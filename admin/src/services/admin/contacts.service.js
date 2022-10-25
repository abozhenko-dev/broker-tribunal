import { $api } from "../axios.service";

export class ContactsService {
  static getOne() {
    return $api.get("/contacts");
  }

  static create(values) {
    return $api.post("/contacts", values);
  }

  static update(values) {
    return $api.put("/contacts", values);
  }
}
