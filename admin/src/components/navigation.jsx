import { useMemo } from "react";

import { Menu } from "antd";
import { Link } from "react-router-dom";

import { DEFAULT_ROUTE } from "@routes";

export const Navigation = ({ items }) => {
  const customItems = useMemo(() => {
    const mapItems = (childs) =>
      childs.map((child) => {
        const label =
          child.type === "link" ? <Link to={child.path || "/"}>{child.label}</Link> : child.label;

        const icon = child.icon && <child.icon />;
        const children = child.children && mapItems(child.children);

        return {
          ...child,
          label,
          icon,
          children
        };
      });

    return mapItems(items);
  }, [items]);

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[DEFAULT_ROUTE]}
      mode="inline"
      items={customItems}
      className="navigation"
    />
  );
};
