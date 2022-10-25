import { ElementType, FC } from "react";

import { IFaq } from "@declarations";

import { Typography } from "@components/ui";

import { useCollapse } from "@hooks";

import { ICONS } from "@constants";

interface AccordionItemProps {
  tag: ElementType;
  item: IFaq;
}

export const AccordionItem: FC<AccordionItemProps> = (props) => {
  // **Props
  const { tag: Tag = "li", item } = props;
  const { collapseRef, isCollapseOpen, handleCollapse } = useCollapse({
    defaultValue: false
  });

  return (
    <Tag className={isCollapseOpen ? "accordion-item open" : "accordion-item"}>
      <button className="accordion-item__head" onClick={handleCollapse}>
        <span className="text">{item.title}</span>
        <span className="icon">{ICONS.shevron}</span>
      </button>
      <div ref={collapseRef} className="accordion-item__body">
        <div>
          {item.content.map((text, index) => (
            <Typography key={text + index} tag="p" color="dark">
              {text}
            </Typography>
          ))}
        </div>
      </div>
    </Tag>
  );
};
