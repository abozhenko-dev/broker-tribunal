import { FC, InputHTMLAttributes, useEffect, useRef } from "react";

import Link from "next/link";

import { Image, Typography } from "@components/ui";

import { ICompany } from "@declarations";

import { ICONS } from "@constants";

import { Rating } from "../rating";

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  withDropdown?: boolean;
  visible?: boolean;
  items?: ICompany[];
  onClose?: () => void;
}

export const Search: FC<SearchProps> = (props) => {
  // **Props
  const { withDropdown, visible, items, onClose, ...rest } = props;

  // **Ref
  const dropdownRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!onClose) return;

    const listener = (event: Event) => {
      const el = dropdownRef?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      onClose();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [dropdownRef, onClose]);

  return (
    <div ref={dropdownRef} className="search">
      <div className="search-current">
        <label>
          <span className="icon">{ICONS.search}</span>
          <input {...rest} />
        </label>
      </div>
      {withDropdown && (
        <div className={visible ? "search-dropdown open" : "search-dropdown"}>
          <ul className="search-dropdown__list">
            {items?.map((item) => (
              <li key={item._id} className="search-dropdown__item">
                <Link
                  href={`/${item.isInCatalog ? "broker" : "regulators"}/${
                    item.slug
                  }`}
                >
                  <a>
                    <div className="search-dropdown__item-image">
                      <Image
                        src={`${item.logo?.link}`}
                        width={68}
                        height={39}
                        alt={item.logo?.meta?.alt || item.name}
                        title={item.logo?.meta?.title || item.name}
                      />
                    </div>
                    <div className="search-dropdown__item-content">
                      <Typography>{item.name}</Typography>
                      <Rating rating={item.rating} withCaption width={80} />
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
