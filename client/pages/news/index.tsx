import type { GetServerSideProps, NextPage } from "next";

import { SWRConfig } from "swr";

import { News } from "@pages";

import { Breadcrumbs } from "@components/ui";
import { Meta } from "@components/utils";

import { MetaService, NewsService } from "@services";

import { IBreadcrumb, IMeta, ITag } from "@declarations";

const NewsPage: NextPage<{
  meta: IMeta;
  breadcrumbs: IBreadcrumb[];
  tags: ITag[];
  fallback: Record<string, any>;
}> = (props) => {
  // **Props
  const { meta, breadcrumbs, tags, fallback } = props;

  return (
    <SWRConfig
      value={{
        fallback,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
      }}
    >
      <Meta meta={meta}>
        <Breadcrumbs items={breadcrumbs} />
        <News tags={tags} />
      </Meta>
    </SWRConfig>
  );
};

export default NewsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const getTags = (as: "url" | "plain") => {
    if (as === "url") {
      if (!context.query.tags) return "";

      if (typeof context.query.tags === "string") {
        return `&tags=${context.query.tags}`;
      }

      return `&tags=${context.query.tags.join(",")}`;
    }

    if (as === "plain") {
      if (!context.query.tags) return null;

      if (typeof context.query.tags === "string") {
        return context.query.tags;
      }

      return context.query.tags.join(",");
    }
  };

  const [meta, homeMeta, tags, articles, last] = await Promise.all([
    MetaService.getOne("news", context.locale),
    MetaService.getOne("home", context.locale),
    NewsService.getTags(context.locale),
    NewsService.getArticles({
      lang: context.locale,
      page: 1,
      size: 12,
      tags: getTags("plain")
    }),
    NewsService.last(context.locale)
  ]);

  return {
    props: {
      tags: tags.data,
      meta: meta.data,
      breadcrumbs: [
        { t: homeMeta.data.breadcrumb || homeMeta.data.title, route: "/" },
        { t: meta.data?.breadcrumb || meta.data.title }
      ],
      fallback: {
        [`/news?lang=${context.locale}&page=1&size=12${getTags("url")}`]:
          articles.data,
        [`/news/last?lang=${context.locale}`]: last.data
      }
    }
  };
};
