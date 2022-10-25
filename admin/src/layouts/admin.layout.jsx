import { Suspense, createElement, useEffect, useState } from "react";

import { Divider, Drawer, Layout } from "antd";
import Scrollbars from "react-custom-scrollbars-2";
import { AiFillLeftCircle, AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import MediaQuery, { useMediaQuery } from "react-responsive";
import { Outlet, useLocation } from "react-router-dom";

import { ErrorBoundary, Logo, Navigation, PageLoader, ProfileMenu } from "@components";

import { navigationConfig } from "@configs";

export const AdminLayout = () => {
  const [visible, setVisible] = useState(false);

  const { pathname } = useLocation();

  const isMobile = useMediaQuery({ maxWidth: 1200 });

  useEffect(() => {
    if (visible && isMobile) setVisible(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleVisible = () => setVisible((prev) => !prev);

  return (
    <Layout className="admin-layout">
      <MediaQuery minWidth={1201}>
        <Layout.Sider
          theme="dark"
          width={250}
          trigger={null}
          collapsible
          collapsed={visible}
          className="admin-layout__sidebar"
        >
          <Scrollbars autoHide>
            <div
              className={
                !visible ? "admin-layout__logo" : "admin-layout__logo admin-layout__logo_collapsed"
              }
            >
              <Logo />
            </div>
            <Divider className="admin-layout__divider" />
            <Navigation items={navigationConfig} />
          </Scrollbars>
        </Layout.Sider>
      </MediaQuery>
      <MediaQuery maxWidth={1200}>
        <Drawer
          width={250}
          className="admin-layout__drawer"
          placement="left"
          closable={false}
          visible={visible}
          onClose={handleVisible}
        >
          <Scrollbars autoHide>
            <div className="admin-layout__drawer-header">
              <Logo />
              <AiFillLeftCircle onClick={handleVisible} size={30} className="admin-layout__close" />
            </div>
            <Divider className="admin-layout__divider" />
            <Navigation items={navigationConfig} />
          </Scrollbars>
        </Drawer>
      </MediaQuery>
      <Layout className="admin-layout__inner">
        <Layout.Header className="admin-layout__header">
          {createElement(visible || isMobile ? AiOutlineMenuUnfold : AiOutlineMenuFold, {
            className: "admin-layout__trigger",
            onClick: handleVisible
          })}
          <ProfileMenu />
        </Layout.Header>
        <Layout.Content>
          <div className="admin-layout__content">
            <ErrorBoundary>
              <Suspense fallback={<PageLoader loading />}>
                <Outlet />
              </Suspense>
            </ErrorBoundary>
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
