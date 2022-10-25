import { FC } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { ITag } from "@declarations";

interface TagProps {
  item: ITag;
}

export const Tag: FC<TagProps> = (props) => {
  // **Props
  const { item } = props;
  const { query, asPath, pathname } = useRouter();

  const getHref = () => {
    if (!query?.tags) {
      return `${asPath}?tags=${item.name}`;
    }

    if (typeof query?.tags === "string") {
      if (query.tags === item.name) {
        return `${pathname}`;
      } else {
        return `${pathname}?tags=${query?.tags}&tags=${item.name}`;
      }
    }

    if (query?.tags.some((tag) => tag === item.name)) {
      return `${pathname}?${query?.tags
        .filter((tag) => tag !== item.name)
        .map((tag) => `tags=${tag}`)
        .join("&")}`;
    } else {
      return `${pathname}?${[...query?.tags, item.name]
        .map((tag) => `tags=${tag}`)
        .join("&")}`;
    }
  };

  return (
    <li className="tags-item">
      <Link href={getHref()}>
        <a className={query.tags?.includes(item.name) ? "active" : null}>
          {item.name}
        </a>
      </Link>
    </li>
  );
};
