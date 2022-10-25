import type { GetServerSideProps, NextPage } from "next";

import { OverviewArticle } from "@pages";

import { Breadcrumbs } from "@components/ui";
import { Meta } from "@components/utils";

import { MetaService, OverviewService } from "@services";

import { IBreadcrumb, IMeta, IOverview } from "@declarations";

const OverviewArticlePage: NextPage<{
  meta: IMeta;
  overview: IOverview;
  breadcrumbs: IBreadcrumb[];
}> = (props) => {
  // **Props
  const { meta, overview, breadcrumbs } = props;

  return (
    <Meta meta={meta}>
      <Breadcrumbs items={breadcrumbs} />
      <OverviewArticle overview={overview} />
    </Meta>
  );
};

export default OverviewArticlePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const [overview, homeMeta] = await Promise.all([
      OverviewService.getOverview(context.query.slug as string, context.locale),
      MetaService.getOne("home", context.locale)
    ]);

    if (overview.status !== 200 || !overview.data) {
      throw overview;
    }

    const { data } = overview;

    const category = data?.categories.find(
      (category) => category.slug === context.query.category
    );

    const meta = {
      title: data?.meta?.title || data.title,
      description: data?.meta?.description || null,
      breadcrumb: data?.meta?.breadcrumb || data.title,
      noIndex: data?.meta?.noIndex || false
    };

    return {
      props: {
        meta,
        overview: data,
        breadcrumbs: [
          { t: homeMeta.data?.breadcrumb || homeMeta.data?.title, route: "/" },
          {
            t: category?.meta?.breadcrumb || category.name,
            route: `/overview/${category.slug}`
          },
          { t: meta.breadcrumb }
        ]
      }
    };
  } catch (err) {
    return {
      notFound: true
    };
  }
};
