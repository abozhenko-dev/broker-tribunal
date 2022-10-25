import type { GetServerSideProps, NextPage } from "next";

import { SWRConfig } from "swr";

import { Home } from "@pages";

import { Meta } from "@components/utils";

import {
  BlogService,
  BrokersService,
  MetaService,
  NewsService,
  OverviewService,
  ReviewsService
} from "@services";

import { IMeta } from "@declarations";

interface HomePageProps {
  meta: IMeta;
  fallback: Record<string, any>;
}

const HomePage: NextPage<HomePageProps> = (props) => {
  // **Props
  const { meta, fallback } = props;

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
        <Home faq={meta.faqs} />
      </Meta>
    </SWRConfig>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [meta, brokers, overview, reviews, blog, last] = await Promise.all([
    MetaService.getOne("home", context.locale),
    BrokersService.new(context.locale),
    OverviewService.getMainCategory(context.locale),
    ReviewsService.get(),
    BlogService.getArticles({
      lang: context.locale,
      page: 1,
      size: 6
    }),
    NewsService.last(context.locale)
  ]);

  return {
    props: {
      meta: meta.data,
      fallback: {
        [`/brokers/new?lang=${context.locale}`]: brokers.data,
        [`/overviews-categories/main?lang=${context.locale}`]: overview.data,
        "/reviews": reviews.data,
        [`/blog?lang=${context.locale}&page=1&size=6`]: blog.data,
        [`/news/last?lang=${context.locale}`]: last.data
      }
    }
  };
};
