import type { GetServerSideProps, NextPage } from "next";

import { Company } from "@pages";

import { Breadcrumbs } from "@components/ui";
import { Meta } from "@components/utils";

import { BrokersService, MetaService } from "@services";

import { IBreadcrumb, ICompany, IMeta } from "@declarations";

const BrokerPage: NextPage<{
  meta: IMeta;
  breadcrumbs: IBreadcrumb[];
  broker: ICompany;
}> = (props) => {
  // **Props
  const { meta, breadcrumbs, broker } = props;

  return (
    <Meta meta={meta}>
      <Breadcrumbs items={breadcrumbs} />
      <Company company={broker} />
    </Meta>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const [broker, homeMeta] = await Promise.all([
      BrokersService.getOne(context.query.slug as string, context.locale),
      MetaService.getOne("home", context.locale)
    ]);

    if (broker.status !== 200 || !broker.data) {
      throw broker;
    }

    const meta = {
      title: broker.data?.meta?.title || broker.data.name,
      description: broker.data?.meta?.description || null,
      breadcrumb: broker.data?.meta?.breadcrumb || broker.data.name,
      noIndex: broker.data?.meta?.noIndex || false
    };

    return {
      props: {
        meta,
        broker: broker.data,
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
