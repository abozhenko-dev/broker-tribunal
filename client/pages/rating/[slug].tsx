import type { GetServerSideProps, NextPage } from "next";

import { SWRConfig } from "swr";

import { Companies } from "@pages";

import { Breadcrumbs } from "@components/ui";
import { Meta } from "@components/utils";

import { CategoriesService, MetaService } from "@services";

import { IBreadcrumb, ICategory, IMeta } from "@declarations";

const RatingPage: NextPage<{
  meta: IMeta;
  breadcrumbs: IBreadcrumb[];
  category: ICategory;
  fallback: Record<string, any>;
}> = (props) => {
  // **Props
  const { meta, breadcrumbs, category, fallback } = props;

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
        <Companies
          title={category.name}
          description={category.description}
          seo={category.meta?.seo}
        />
      </Meta>
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const [category, homeMeta] = await Promise.all([
      CategoriesService.getOne(context.query.slug as string, {
        lang: context.locale,
        page: 1,
        size: 8,
        sort: "default"
      }),
      MetaService.getOne("home", context.locale)
    ]);

    if (category.status !== 200 || !category.data) {
      throw category;
    }

    const meta = {
      title: category.data?.meta?.title || category.data.name,
      description: category.data?.meta?.description || null,
      breadcrumb: category.data?.meta?.breadcrumb || category.data.name,
      noIndex: category.data?.meta?.noIndex || false
    };

    return {
      props: {
        meta,
        category: category.data,
        breadcrumbs: [
          { t: homeMeta.data?.breadcrumb || homeMeta.data.title, route: "/" },
          { t: meta.breadcrumb }
        ],
        fallback: {
          [`/categories/${context.query.slug}?lang=${context.locale}&page=1&size=8&sort=default`]:
            category.data
        }
      }
    };
  } catch (err) {
    return {
      notFound: true
    };
  }
};

export default RatingPage;
