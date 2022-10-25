import type { GetServerSideProps, NextPage } from "next";

import { SWRConfig } from "swr";

import { Blog } from "@pages";

import { Breadcrumbs } from "@components/ui";
import { Meta } from "@components/utils";

import { BlogService, MetaService } from "@services";

import { IBreadcrumb, IMeta, ITag } from "@declarations";

interface BlogPageProps {
  meta: IMeta;
  breadcrumbs: IBreadcrumb[];
  tags: ITag[];
  fallback: Record<string, any>;
}

const BlogPage: NextPage<BlogPageProps> = (props) => {
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
        <Blog title={meta.breadcrumb || meta.title} tags={tags} />
      </Meta>
    </SWRConfig>
  );
};

export default BlogPage;

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

  const [meta, homeMeta, tags, articles] = await Promise.all([
    MetaService.getOne("blog", context.locale),
    MetaService.getOne("home", context.locale),
    BlogService.getTags(context.locale),
    BlogService.getArticles({
      lang: context.locale,
      page: 1,
      size: 12,
      tags: getTags("plain")
    })
  ]);

  return {
    props: {
      tags: tags.data,
      meta: meta.data,
      breadcrumbs: [
        { t: homeMeta.data.breadcrumb || homeMeta.data.title, route: "/" },
        { t: meta.data.breadcrumb || meta.data.title }
      ],
      fallback: {
        [`/blog?lang=${context.locale}&page=1&size=12${getTags("url")}`]:
          articles.data
      }
    }
  };
};
