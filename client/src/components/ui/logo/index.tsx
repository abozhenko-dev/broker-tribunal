/* eslint-disable @next/next/no-img-element */
import { FC } from "react";

import Link from "next/link";

import { useTranslation } from "@hooks";

import { HtmlImage } from "../image";

export const Logo: FC = () => {
  // **Props
  const t = useTranslation();

  return (
    <div className="logo">
      <Link href="/">
        <a>
          <HtmlImage
            src="/media/ui/logo.svg"
            width={150}
            height={40}
            title={t.alt.logo}
            alt={t.alt.logo}
          />
        </a>
      </Link>
    </div>
  );
};
