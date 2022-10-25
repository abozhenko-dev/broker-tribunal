import { FC, useRef, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import Cookies from "js-cookie";

import { useOnClickOutside } from "@hooks";

export const Languages: FC = () => {
  // **Props
  const { locale, locales, asPath } = useRouter();

  // **Local state
  const [open, setOpen] = useState(false);

  // **Ref
  const langRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onLangChange = (lang: string) => () => {
    Cookies.set("NEXT_LOCALE", lang, {
      expires: 365
    });
    handleClose();
  };

  useOnClickOutside(langRef, handleClose);

  return (
    <div ref={langRef} className={open ? "languages open" : "languages"}>
      <button className="languages-current" onClick={handleOpen}>
        {locale}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="16"
            width="16"
            height="16"
            rx="8"
            transform="rotate(-90 0 16)"
            fill="white"
          />
          <path
            d="M4 10L8 6L12 10"
            stroke="#090810"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="languages-dropdown">
        <ul className="languages-list">
          {locales.map((lang) => (
            <li
              key={lang}
              className={
                locale === lang ? "languages-item active" : "languages-item"
              }
            >
              <Link href={asPath} as={asPath} locale={lang}>
                <a onClick={onLangChange(lang)}>{lang}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
