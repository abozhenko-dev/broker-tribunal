import { FC } from "react";

import { IBreadcrumb } from "@declarations";

import { Container } from "../container";

import { BreadcrumbItem } from "./item";

interface BreadcrumbsProps {
  items: IBreadcrumb[];
}

export const Breadcrumbs: FC<BreadcrumbsProps> = (props) => {
  // **Props
  const { items } = props;

  return (
    <div className="breadcrumbs">
      <Container>
        <ul className="breadcrumbs-list">
          {items.map((item) => (
            <BreadcrumbItem key={item.t} item={item} />
          ))}
        </ul>
      </Container>
    </div>
  );
};
