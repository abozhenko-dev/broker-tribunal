import Cookies from "js-cookie";

import { $api } from "./axios.service";

export class AuthService {
  static async login(body) {
    const resp = await $api.post("/auth/login", body, { withCredentials: true });
    if (resp.status === 200) Cookies.set("accessToken", resp.data.token);

    return resp;
  }

  static async refresh() {
    const resp = await $api.post("/auth/refresh", {}, { withCredentials: true });
    if (resp.status === 200) Cookies.set("accessToken", resp.data.token);

    return resp;
  }

  static async logout() {
    await $api.post("/auth/logout", {}, { withCredentials: true });
    Cookies.remove("accessToken");
  }

  static getUserInfo() {
    return $api.get("/auth/user");
  }

  static reset(body) {
    return $api.post("/auth/reset-init", body);
  }

  static resetFinish(body) {
    return $api.post("/auth/reset-finish", body);
  }
}
