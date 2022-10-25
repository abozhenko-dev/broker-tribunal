import { matchPath, useLocation } from "react-router-dom";

import * as routes from "@routes";

export const useMatchedRoute = () => {
  const { pathname } = useLocation();

  return Object.values(routes)
    .flat()
    .find((route) => matchPath({ path: route.path }, pathname));
};
