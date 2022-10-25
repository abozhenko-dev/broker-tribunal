import type { GetServerSideProps, NextPage } from "next";

import { Company } from "@pages";

import { Breadcrumbs } from "@components/ui";
import { Meta } from "@components/utils";

import { MetaService, RegulatorsService } from "@services";

import { IBreadcrumb, ICompany, IMeta } from "@declarations";

const BrokerPage: NextPage<{
  meta: IMeta;
  breadcrumbs: IBreadcrumb[];
  regulator: ICompany;
}> = (props) => {
  // **Props
  const { meta, breadcrumbs, regulator } = props;

  return (
    <Meta meta={meta}>
      <Breadcrumbs items={breadcrumbs} />
      <Company regulator company={regulator} />
    </Meta>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const [regulator, homeMeta] = await Promise.all([
      RegulatorsService.getOne(context.query.slug as string, context.locale),
      MetaService.getOne("home", context.locale)
    ]);

    if (regulator.status !== 200 || !regulator.data) {
      throw regulator;
    }

    const meta = {
      title: regulator.data?.meta?.title || regulator.data.name,
      description: regulator.data?.meta?.description || null,
      breadcrumb: regulator.data?.meta?.breadcrumb || regulator.data.name,
      noIndex: regulator.data?.meta?.noIndex || false
    };

    return {
      props: {
        meta,
        regulator: regulator.data,
        breadcrumbs: [
          { t: homeMeta.data?.breadcrumb || homeMeta.data.title, route: "/" },
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

export default BrokerPage;
