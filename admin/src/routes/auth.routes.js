import { lazy } from "react";

export const authRoutes = [
  {
    path: "/auth/login",
    tag: "login",
    component: lazy(() => import("@pages/auth/login"))
  },
  {
    path: "/auth/reset",
    tag: "reset",
    component: lazy(() => import("@pages/auth/reset"))
  },
  {
    path: "/auth/reset/:token",
    tag: "reset-finish",
    component: lazy(() => import("@pages/auth/reset-finish"))
  }
];
