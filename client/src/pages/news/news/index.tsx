import { FC, useEffect, useMemo, useState } from "react";

import { useRouter } from "next/router";

import useSWR from "swr";

import { ArticleCard } from "@components/cards";
import { Pagination } from "@components/common";
import { Container, Tags } from "@components/ui";

import { INews, ITag } from "@declarations";

interface NewsProps {
  tags: ITag[];
}

export const News: FC<NewsProps> = (props) => {
  // **Props
  const { tags } = props;
  const { locale, query } = useRouter();

  // **Local state
  const [page, setPage] = useState(1);
  const size = 12;

  const queryTags = useMemo(() => {
    if (!query.tags) return "";

    if (typeof query.tags === "string") {
      return `&tags=${query.tags}`;
    }

    return `&tags=${query.tags.join(",")}`;
  }, [query.tags]);

  // **SWR
  const { data } = useSWR<{ data: INews[]; total: number }>(
    `/news?lang=${locale}&page=${page}&size=${size}${queryTags}`
  );

  useEffect(() => {
    setPage(1);
  }, [query.tags]);

  return (
    <div className="news gutter-section-bottom">
      <Container>
        <Tags items={tags} />
        <ul className="news-list">
          {data?.data?.map((news) => (
            <ArticleCard
              key={news._id}
              article={news}
              tag="li"
              route="news"
              imgWidth={328}
              imgHeight={230}
            />
          ))}
        </ul>
        <Pagination
          totalPages={data?.total / size}
          currentPage={page}
          handleChangePage={(page) => {
            setPage(page);
          }}
        />
      </Container>
    </div>
  );
};
