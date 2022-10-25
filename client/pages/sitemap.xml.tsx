import { GetServerSideProps } from "next";

import { SeoService } from "@services";

import * as fs from "fs";

const Sitemap = (): void => null;

export const getServerSideProps: GetServerSideProps = async ({
  res,
  defaultLocale,
  locales
}) => {
  const getPathes = (folder: string) => {
    const files = [];

    for (const file of fs.readdirSync(folder)) {
      const fullPath = `${folder}/${file}`;

      if (fs.lstatSync(fullPath).isDirectory()) {
        getPathes(fullPath).forEach((x) => files.push(`${file}/${x}`));
      } else {
        files.push(file);
      }
    }

    return files;
  };

  const restrictedPathes = [
    "api",
    "_",
    "404",
    "500",
    "sitemap",
    "robots",
    "\\[",
    "\\]"
  ];

  const staticPaths = getPathes("pages")
    .filter(
      (page) =>
        !restrictedPathes.some((path) => {
          const reg = new RegExp(path, "gi");

          return reg.test(page);
        })
    )
    .map((page) => page.replace(/\/index/, "").replace(/\.tsx/, ""))
    .map((page) => {
      const pages: { url: string; priority: number }[] = [];

      if (page === "index") {
        locales?.forEach((locale) => {
          if (locale === defaultLocale) {
            pages.push({
              url: "/",
              priority: 1
            });
          } else {
            pages.push({
              url: `/${locale}`,
              priority: 1
            });
          }
        });
      } else {
        locales?.forEach((locale) => {
          if (locale === defaultLocale) {
            pages.push({
              url: `/${page}`,
              priority: 0.3
            });
          } else {
            pages.push({
              url: `/${locale}/${page}`,
              priority: 0.3
            });
          }
        });
      }

      return pages;
    })
    .flat();

  const dynamicPaths = await SeoService.sitemap();

  const articles = dynamicPaths.data?.articles?.map((article: any) => ({
    url:
      article.lang === defaultLocale
        ? `/blog/${article.slug}`
        : `/${article.lang}/blog/${article.slug}`,
    priority: 0.3
  }));

  const brokers = dynamicPaths.data?.brokers?.map((broker: any) => ({
    url:
      broker.lang === defaultLocale
        ? `/broker/${broker.slug}`
        : `/${broker.lang}/broker/${broker.slug}`,
    priority: 0.7
  }));

  const news = dynamicPaths.data?.news?.map((news: any) => ({
    url:
      news.lang === defaultLocale
        ? `/news/${news.slug}`
        : `/${news.lang}/news/${news.slug}`,
    priority: 0.3
  }));

  const ratings = dynamicPaths.data?.categories?.map((rating: any) => ({
    url:
      rating.lang === defaultLocale
        ? `/rating/${rating.slug}`
        : `/${rating.lang}/rating/${rating.slug}`,
    priority: 0.7
  }));

  const regulators = dynamicPaths.data?.regulators?.map((regulator: any) => ({
    url:
      regulator.lang === defaultLocale
        ? `/regulators/${regulator.slug}`
        : `/${regulator.lang}/regulators/${regulator.slug}`,
    priority: 0.7
  }));

  const overviews = dynamicPaths.data?.overviewsCategories
    ?.map((overview: any) => {
      const array = [];

      array.push({
        url:
          overview.lang === defaultLocale
            ? `/overview/${overview.slug}`
            : `/${overview.lang}/overview/${overview.slug}`,
        priority: 0.5
      });

      overview.overviews.forEach((entity: any) => {
        array.push({
          url:
            entity.lang === defaultLocale
              ? `/overview/${overview.slug}/${entity.slug}`
              : `/${entity.lang}/overview/${overview.slug}/${entity.slug}`,
          priority: 0.5
        });
      });

      return array;
    })
    .flat();

  const allPaths = [
    ...staticPaths,
    ...articles,
    ...brokers,
    ...news,
    ...ratings,
    ...regulators,
    ...overviews
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
        .map(
          ({ url, priority }) =>
            `<url>
              <loc>${process.env.NEXT_PUBLIC_APP_URL}${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>${priority}</priority>
            </url>`
        )
        .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {}
  };
};

export default Sitemap;
