import type { GetServerSideProps, NextPage } from "next";

import { Policy } from "@pages";

import { Breadcrumbs } from "@components/ui";
import { Meta } from "@components/utils";

import { MetaService } from "@services";

import { IBreadcrumb, IMeta } from "@declarations";

const PolicyPage: NextPage<{ meta: IMeta; breadcrumbs: IBreadcrumb[] }> = (
  props
) => {
  // **Props
  const { meta, breadcrumbs } = props;

  return (
    <Meta meta={meta}>
      <Breadcrumbs items={breadcrumbs} />
      <Policy content={meta?.seo || ""} />
    </Meta>
  );
};

export default PolicyPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [meta, homeMeta] = await Promise.all([
    MetaService.getOne("policy", context.locale),
    MetaService.getOne("home", context.locale)
  ]);

  return {
    props: {
      meta: meta.data,
      breadcrumbs: [
        { t: homeMeta.data.breadcrumb || homeMeta.data.title, route: "/" },
        { t: meta.data?.breadcrumb || meta.data.title }
      ]
    }
  };
};
