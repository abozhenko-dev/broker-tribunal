import { FC, ReactNode } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { IMeta } from "@declarations";

import { NEXT_PUBLIC_APP_URL } from "@constants";

interface MetaProps {
  meta: IMeta;
  children: ReactNode;
}

export const Meta: FC<MetaProps> = (props) => {
  // **Props
  const { meta, children } = props;
  const { locales, defaultLocale, locale, asPath } = useRouter();

  const urlBuilder = (initialLocale?: string) => {
    const head = NEXT_PUBLIC_APP_URL;
    const lang = initialLocale || locale;

    if (lang !== defaultLocale && asPath === "/") {
      return `${head}/${lang}`;
    }

    if (lang !== defaultLocale && asPath !== "/") {
      return `${head}/${lang}${asPath}`;
    }

    if (asPath === "/") {
      return head;
    }

    return head + asPath;
  };

  return (
    <>
      <Head>
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="canonical" href={urlBuilder()} />

        {locales?.map((locale) => (
          <link
            key={locale}
            rel="alternate"
            hrefLang={locale}
            href={urlBuilder(locale)}
          />
        ))}

        {meta?.noIndex && <meta name="robots" content="noindex, nofollow" />}
        {!meta?.noIndex && <meta name="robots" content="index, follow" />}
      </Head>
      {children}
    </>
  );
};
