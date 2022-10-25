import type { GetServerSideProps, NextPage } from "next";

import { SWRConfig } from "swr";

import { Overview } from "@pages";

import { Breadcrumbs } from "@components/ui";
import { Meta } from "@components/utils";

import { MetaService, OverviewService } from "@services";

import { IBreadcrumb, IMeta, IOverviewCategory } from "@declarations";

const OverviewPage: NextPage<{
  meta: IMeta;
  overview: IOverviewCategory;
  breadcrumbs: IBreadcrumb[];
  fallback: Record<string, IOverviewCategory>;
}> = (props) => {
  // **Props
  const { meta, breadcrumbs, overview, fallback } = props;

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
        <Overview overview={overview} />
      </Meta>
    </SWRConfig>
  );
};

export default OverviewPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const [overview, homeMeta] = await Promise.all([
      OverviewService.getOverviewsByCategory(context.query.category as string, {
        lang: context.locale,
        page: 1,
        size: 15,
        sort: "default"
      }),
      MetaService.getOne("home", context.locale)
    ]);

    if (overview.status !== 200 || !overview.data) {
      throw overview;
    }

    const { data } = overview;

    const meta = {
      title: data?.meta?.title || data.name,
      description: data?.meta?.description || null,
      breadcrumb: data?.meta?.breadcrumb || data.name,
      noIndex: data?.meta?.noIndex || false
    };

    return {
      props: {
        meta,
        overview: data,
        breadcrumbs: [
          { t: homeMeta.data?.breadcrumb || homeMeta.data?.title, route: "/" },
          { t: meta.breadcrumb }
        ],
        fallback: {
          [`/overviews-categories/${context.query.category}?lang=${context.locale}&page=1&size=15&sort=default`]:
            data
        }
      }
    };
  } catch (err) {
    return {
      notFound: true
    };
  }
};
