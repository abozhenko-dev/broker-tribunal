import { lazy } from "react";

export const appRoutes = [
  {
    path: "/not-found",
    tag: "not-found",
    component: lazy(() => import("@pages/not-found"))
  }
];
