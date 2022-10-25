import { ADMIN_ROUTES } from "./admin.routes";
import { SITE_ROUTES } from "./site.routes";

export const API_ROUTES = [...ADMIN_ROUTES, ...SITE_ROUTES];
