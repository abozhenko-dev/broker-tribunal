import { GetServerSideProps } from "next";

import { SeoService } from "@services";

const Robots = (): void => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const seo = await SeoService.get();

  res.setHeader("Content-Type", "text/plain");
  res.write(seo.data.robots);
  res.end();

  return {
    props: {}
  };
};

export default Robots;
