import { FC } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { useTranslation } from "@hooks";

import { ITag } from "@declarations";

import { Tag } from "./item";

interface TagsProps {
  withAll?: boolean;
  items: ITag[];
}

export const Tags: FC<TagsProps> = (props) => {
  // **Props
  const { withAll = false, items } = props;
  const t = useTranslation();
  const { query } = useRouter();

  const getAllClasses = () => {
    let className = "";

    if (!query?.tags || items.length === query.tags.length) {
      className = "active";
    }

    return className;
  };

  return (
    <ul className="tags">
      {withAll && (
        <li className="tags-item">
          <Link
            href={{
              query: null
            }}
          >
            <a className={getAllClasses()}>{t.bin.all}</a>
          </Link>
        </li>
      )}

      {items.map((item) => (
        <Tag key={item.name} item={item} />
      ))}
    </ul>
  );
};
