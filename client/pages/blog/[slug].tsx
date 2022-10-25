import type { GetServerSideProps, NextPage } from "next";

import { Article } from "@pages";

import { Breadcrumbs } from "@components/ui";
import { Meta } from "@components/utils";

import { BlogService, MetaService } from "@services";

import { IArticle, IBreadcrumb, IMeta } from "@declarations";

const ArticlePage: NextPage<{
  meta: IMeta;
  article: IArticle;
  breadcrumbs: IBreadcrumb[];
}> = (props) => {
  // **Props
  const { meta, article, breadcrumbs } = props;

  return (
    <Meta meta={meta}>
      <Breadcrumbs items={breadcrumbs} />
      <Article article={article} />
    </Meta>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const [blogMeta, homeMeta, article] = await Promise.all([
      MetaService.getOne("blog", context.locale),
      MetaService.getOne("home", context.locale),
      BlogService.getArticle(context.query.slug as string, context.locale)
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
            t: blogMeta.data?.breadcrumb || blogMeta.data.title,
            route: "/blog"
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
