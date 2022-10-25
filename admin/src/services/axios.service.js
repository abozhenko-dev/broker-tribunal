import axios from "axios";
import Cookies from "js-cookie";

import { AuthService } from "./auth.service";

export const $api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

let refreshed = false;

$api.interceptors.request.use((request) => {
  const accessToken = Cookies.get("accessToken");
  if (accessToken) request.headers["Authorization"] = `Bearer ${accessToken}`;

  return request;
});

$api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    if (error.response.status === 401 && !refreshed) {
      refreshed = true;

      const resp = await AuthService.refresh();

      if (resp.status === 200) {
        Cookies.set("accessToken", resp.data.token);

        return $api(originalConfig);
      }
    }

    refreshed = false;

    return error;
  }
);
