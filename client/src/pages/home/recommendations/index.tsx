import { FC } from "react";

import { useRouter } from "next/router";

import useSWR from "swr";

import { ArticleCard } from "@components/cards";
import { Container, Link, Typography } from "@components/ui";

import { useTranslation } from "@hooks";

import { IArticle } from "@declarations";

export const Recommendations: FC = () => {
  // **Props
  const t = useTranslation();
  const { locale } = useRouter();

  // **SWR
  const { data } = useSWR<{ data: IArticle[]; total: number }>(
    `/blog?lang=${locale}&page=1&size=6`
  );

  if (data && data?.data?.length === 0) {
    return null;
  }

  return (
    <div className="recommendations gutter-section-top gutter-section-bottom">
      <Container>
        <div className="recommendations-top gutter-head">
          <Typography tag="h2" variant="h2">
            {t.bin.readRecommendations}
          </Typography>
          <Link href="/blog" icon="arrow">
            {t.bin.seeAllNews}
          </Link>
        </div>
        <ul className="recommendations-list">
          {data?.data?.map((item) => (
            <ArticleCard
              key={item._id}
              article={item}
              imgWidth={368}
              imgHeight={209}
              noDescription
            />
          ))}
        </ul>
        <Link href="/news" icon="arrow" variant="border">
          {t.bin.seeAllNews}
        </Link>
      </Container>
    </div>
  );
};
