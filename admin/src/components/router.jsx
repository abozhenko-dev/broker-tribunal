import { Navigate, Route, Routes } from "react-router-dom";

import { DEFAULT_ROUTE, adminRoutes, appRoutes, authRoutes } from "@routes";

import { AdminLayout, AuthLayout, ProtectedLayout } from "@layouts";

export const Router = () => {
  const renderRoutes = (routes) =>
    routes.map((route) => (
      <Route key={route.path} path={route.path} element={<route.component />}>
        {route?.routes?.length && renderRoutes(route.routes)}
      </Route>
    ));

  return (
    <Routes>
      <Route path="/" element={<Navigate to={DEFAULT_ROUTE} replace />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />

      <Route element={<ProtectedLayout />}>
        <Route element={<AdminLayout />}>{renderRoutes(adminRoutes)}</Route>
      </Route>

      <Route element={<AuthLayout />}>{renderRoutes(authRoutes)}</Route>
      <Route element={<AdminLayout />}>{renderRoutes(appRoutes)}</Route>
    </Routes>
  );
};
