import { FC, useEffect, useMemo, useState } from "react";

import { useRouter } from "next/router";

import useSWR from "swr";

import { ArticleCard } from "@components/cards";
import { Pagination } from "@components/common";
import { Container, Tags, Typography } from "@components/ui";

import { IArticle, ITag } from "@declarations";

export const Blog: FC<{ title: string; tags: ITag[] }> = (props) => {
  // **Props
  const { title, tags } = props;
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
  const { data } = useSWR<{ data: IArticle[]; total: number }>(
    `/blog?lang=${locale}&page=${page}&size=${size}${queryTags}`
  );

  useEffect(() => {
    setPage(1);
  }, [query.tags]);

  return (
    <div className="blog gutter-section-bottom">
      <Container>
        <div className="blog-wrapper">
          <Typography tag="h1" variant="h2">
            {title}
          </Typography>
          <Tags withAll items={tags} />
          <ul className="news-list">
            {data?.data?.map((article) => (
              <ArticleCard
                key={article._id}
                tag="li"
                imgWidth={328}
                imgHeight={230}
                article={article}
                noDescription
              />
            ))}
          </ul>
          <Pagination
            currentPage={page}
            totalPages={data?.total / size}
            handleChangePage={(page) => {
              setPage(page);
            }}
          />
        </div>
      </Container>
    </div>
  );
};
