import { lazy } from "react";

export const authRoutes = [
  {
    path: "/auth/login",
    tag: "login",
    component: lazy(() => import("@pages/auth/login"))
  }
];
