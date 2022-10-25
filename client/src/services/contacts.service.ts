import { IContacts } from "@declarations";

import { $api } from "./axios.service";

export class ContactsService {
  static get() {
    return $api.get<IContacts>("/contacts");
  }
}
