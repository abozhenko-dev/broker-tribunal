import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { getUserState } from "@store/selectors";

export const ProtectedLayout = () => {
  const { isAuthorized } = useSelector(getUserState);

  return isAuthorized ? <Outlet /> : <Navigate to="/auth/login" replace />;
};
