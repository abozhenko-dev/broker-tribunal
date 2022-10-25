import { ElementType, FC } from "react";

import { IFaq } from "@declarations";

import { AccordionItem } from "./item";

interface AccordionProps {
  parentTag?: ElementType;
  childTag?: ElementType;
  items: IFaq[];
}

export const Accordion: FC<AccordionProps> = (props) => {
  // **Props
  const { parentTag: Parent = "ul", childTag, items } = props;

  return (
    <Parent className="accordion">
      {items.map((item) => (
        <AccordionItem key={item.title} item={item} tag={childTag} />
      ))}
    </Parent>
  );
};
