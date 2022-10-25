import axios from "axios";

import { NEXT_PUBLIC_API_URL } from "@constants";

export const $api = axios.create({
  baseURL: NEXT_PUBLIC_API_URL
});
