import { ElementType, FC, Fragment, useEffect, useState } from "react";

import { useRouter } from "next/router";

import useSWR from "swr";

import { ArticleCard } from "@components/cards";
import { Container, Link, Typography } from "@components/ui";

import { useTranslation } from "@hooks";

import { INews } from "@declarations";

interface LastNewsProps {
  titleTag?: ElementType;
  withAllNews?: boolean;
}

export const LastNews: FC<LastNewsProps> = (props) => {
  // **Props
  const { titleTag, withAllNews } = props;
  const t = useTranslation();
  const { locale } = useRouter();

  // **Local state
  const [isHorizontal, setIsHorizontal] = useState(false);

  // **SWR
  const { data } = useSWR<INews[]>(`/news/last?lang=${locale}`);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1200px)");

    const handleTabletChange = (e: any) => {
      setIsHorizontal(!e?.matches);
    };

    mediaQuery.addEventListener("change", handleTabletChange);

    handleTabletChange(mediaQuery);

    return () => {
      mediaQuery.removeEventListener("change", handleTabletChange);
    };
  }, []);

  if (!data?.length) {
    return null;
  }

  return (
    <div className="last-news">
      <Container>
        <div className="last-news__top">
          <Typography tag={titleTag} variant="h2">
            {t.bin.lastNews}
          </Typography>
          {withAllNews && (
            <Link href="/news" icon="arrow">
              {t.bin.seeAllNews}
            </Link>
          )}
        </div>
        <div className="last-news__wrapper">
          <div className="last-news__left">
            <ArticleCard
              article={data[data.length - 1]}
              route="news"
              imgWidth={592}
              imgHeight={290}
              noDescription={!isHorizontal}
            />
          </div>
          <div className="last-news__right">
            {data
              .slice(0, -1)
              .reverse()
              .map((news, index) => (
                <Fragment key={news._id}>
                  <ArticleCard
                    article={news}
                    route="news"
                    imgWidth={256}
                    imgHeight={156}
                    noDescription
                    direction={isHorizontal ? "horizontal" : "vertical"}
                  />
                  {index !== data.length - 2 && (
                    <div className="last-news__divider"></div>
                  )}
                </Fragment>
              ))}
          </div>
        </div>
        {withAllNews && (
          <Link href="/news" icon="arrow" variant="border">
            {t.bin.seeAllNews}
          </Link>
        )}
      </Container>
    </div>
  );
};
