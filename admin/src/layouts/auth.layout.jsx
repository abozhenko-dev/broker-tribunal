import { Suspense } from "react";

import { Card } from "antd";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { DEFAULT_ROUTE } from "@routes";

import { Logo, PageLoader } from "@components";

import { getUserState } from "@store/selectors";

export const AuthLayout = () => {
  const { isAuthorized } = useSelector(getUserState);

  if (isAuthorized) return <Navigate to={DEFAULT_ROUTE} />;

  return (
    <div className="auth-layout">
      <Card className="auth-layout__inner">
        <div className="auth-layout__logo">
          <Logo dark />
        </div>
        <Suspense fallback={<PageLoader loading />}>
          <Outlet />
        </Suspense>
      </Card>
    </div>
  );
};
