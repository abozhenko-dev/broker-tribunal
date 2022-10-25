import { FC } from "react";

import Link from "next/link";

import { IBreadcrumb } from "@declarations";

interface BreadcrumbItemProps {
  item: IBreadcrumb;
}

export const BreadcrumbItem: FC<BreadcrumbItemProps> = (props) => {
  // **Props
  const { item } = props;
  const isLast = !item.route;

  return (
    <li className={isLast ? "breadcrumbs-item last" : "breadcrumbs-item"}>
      {!isLast && (
        <Link href={item.route}>
          <a>{item.t}</a>
        </Link>
      )}
      {isLast && item.t}
    </li>
  );
};
