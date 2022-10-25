import type { GetServerSideProps, NextPage } from "next";

import { IMeta } from "@declarations";

import { Consultation } from "@pages";

import { Meta } from "@components/utils";

import { MetaService } from "@services";

const ConsultationPage: NextPage<{
  meta: IMeta;
}> = (props) => {
  // **Props
  const { meta } = props;

  return (
    <Meta meta={meta}>
      <Consultation />
    </Meta>
  );
};

export default ConsultationPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [meta] = await Promise.all([
    MetaService.getOne("consultation", context.locale)
  ]);

  return {
    props: {
      meta: meta.data
    }
  };
};
