import { FC, ReactNode } from "react";

import { useCollapse } from "@hooks";

import { ICONS } from "@constants";

interface AccordionProps {
  title: string;
  children: ReactNode;
}

export const Accordion: FC<AccordionProps> = (props) => {
  // **Props
  const { title, children } = props;
  const { collapseRef, isCollapseOpen, handleCollapse } = useCollapse({
    defaultValue: false
  });

  return (
    <li
      className={isCollapseOpen ? "header-nav__item open" : "header-nav__item"}
    >
      <button onClick={handleCollapse}>
        <span className="text">{title}</span>
        <span className="icon">{ICONS.shevron}</span>
      </button>
      <div ref={collapseRef}>
        <ul>{children}</ul>
      </div>
    </li>
  );
};
