import type { GetServerSideProps, NextPage } from "next";

import { SWRConfig } from "swr";

import { Companies } from "@pages";

import { Breadcrumbs } from "@components/ui";
import { Meta } from "@components/utils";

import { MetaService, RegulatorsService } from "@services";

import { IBreadcrumb, IMeta } from "@declarations";

const RegulatorsPage: NextPage<{
  meta: IMeta;
  breadcrumbs: IBreadcrumb[];
  fallback: Record<string, any>;
}> = (props) => {
  // **Props
  const { meta, breadcrumbs, fallback } = props;

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
          regulator
          title={meta?.breadcrumb || meta.title}
          seo={meta?.seo || ""}
        />
      </Meta>
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [regulators, meta, homeMeta] = await Promise.all([
    RegulatorsService.getAll({
      lang: context.locale,
      page: 1,
      size: 8,
      sort: "default"
    }),
    MetaService.getOne("regulators", context.locale),
    MetaService.getOne("home", context.locale)
  ]);

  return {
    props: {
      meta: meta.data,
      regulators: regulators.data,
      breadcrumbs: [
        { t: homeMeta.data?.breadcrumb || homeMeta.data.title, route: "/" },
        { t: meta.data?.breadcrumb || meta.data.title }
      ],
      fallback: {
        [`/regulators?lang=${context.locale}&page=1&size=8&sort=default`]:
          regulators.data
      }
    }
  };
};

export default RegulatorsPage;
