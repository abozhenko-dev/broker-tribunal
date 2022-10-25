import { ChangeEvent, FC, useEffect, useState } from "react";

import { useRouter } from "next/router";

import useSWR from "swr";

import { ReviewCard } from "@components/cards";
import { ComplaintForm, Filter, Pagination, Search } from "@components/common";
import { Container, Typography } from "@components/ui";

import { useTranslation } from "@hooks";

import { IOverviewCategory } from "@declarations";

interface OverviewProps {
  overview: IOverviewCategory;
}

export const Overview: FC<OverviewProps> = (props) => {
  // **Props
  const { overview } = props;
  const t = useTranslation();
  const { query, locale } = useRouter();

  // **Local state
  const size = 15;
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    label: t.filters.lastAdded,
    value: "default"
  });

  // **SWR
  const { data } = useSWR<IOverviewCategory>(
    `/overviews-categories/${
      query.category
    }?lang=${locale}&page=${page}&size=${size}&sort=${filter.value}${
      search.length ? `&search=${search}` : ""
    }`
  );

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setPage(1);
  }, [filter, search]);

  return (
    <>
      <div className="overview gutter-section-bottom">
        <Container>
          <div className="overview-top">
            <Typography tag="h3" variant="h3">
              {overview.name}
            </Typography>
            <div className="overview-top__description">
              {overview.description.map((text) => (
                <Typography
                  key={text}
                  tag="p"
                  variant="paragraph2"
                  color="dark"
                  className="description"
                >
                  {text}
                </Typography>
              ))}
            </div>
          </div>
          <div className="overview-wrapper">
            <div className="overview-panel">
              <Search
                value={search}
                onInput={handleInput}
                placeholder={t.bin.search as string}
              />
              <Filter
                value={filter}
                options={[
                  { label: t.filters.ascending, value: "asc" },
                  { label: t.filters.descending, value: "desc" },
                  { label: t.filters.lastAdded, value: "default" }
                ]}
                onChange={(option) => setFilter(option)}
              />
            </div>
            <ul className="overview-list">
              {data?.overviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  tag="li"
                  category={overview.slug}
                  item={review}
                />
              ))}
            </ul>
            <Pagination
              currentPage={page}
              totalPages={data?.overviewsTotal / size}
              handleChangePage={(page) => {
                setPage(page);
              }}
            />
          </div>
        </Container>
      </div>
      <ComplaintForm />
    </>
  );
};
