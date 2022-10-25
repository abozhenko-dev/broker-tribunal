import type { GetServerSideProps, NextPage } from "next";

import { Article } from "@pages";

import { Breadcrumbs } from "@components/ui";
import { Meta } from "@components/utils";

import { MetaService, NewsService } from "@services";

import { IBreadcrumb, IMeta, INews } from "@declarations";

const ArticlePage: NextPage<{
  meta: IMeta;
  article: INews;
  breadcrumbs: IBreadcrumb[];
}> = (props) => {
  // **Props
  const { meta, article, breadcrumbs } = props;

  return (
    <Meta meta={meta}>
      <Breadcrumbs items={breadcrumbs} />
      <Article news={article} />
    </Meta>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const [newsMeta, homeMeta, article] = await Promise.all([
      MetaService.getOne("news", context.locale),
      MetaService.getOne("home", context.locale),
      NewsService.getArticle(context.query.slug as string, context.locale)
    ]);

    if (article.status !== 200 || !article.data) {
      throw article;
    }

    const meta = {
      title: article.data?.meta?.title || article.data.title,
      description: article.data?.meta?.description || null,
      breadcrumb: article.data?.meta?.breadcrumb || article.data.title,
      noIndex: article.data?.meta?.noIndex || false
    };

    return {
      props: {
        meta,
        article: article.data,
        breadcrumbs: [
          { t: homeMeta.data?.breadcrumb || homeMeta.data.title, route: "/" },
          {
            t: newsMeta.data?.breadcrumb || newsMeta.data.title,
            route: "/news"
          },
          { t: article.data?.meta?.breadcrumb || article.data.title }
        ]
      }
    };
  } catch (err) {
    return {
      notFound: true
    };
  }
};

export default ArticlePage;
