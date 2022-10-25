import { ChangeEvent, FC, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { BannerLayout } from "@layouts";
import useSWR from "swr";

import { Filter, Pagination, Search, Seo } from "@components/common";
import { Container, Typography } from "@components/ui";

import { useTranslation } from "@hooks";

import { Table } from "./table";

interface CompaniesProps {
  title: string;
  regulator?: boolean;
  description?: string[];
  seo?: string;
}

export const Companies: FC<CompaniesProps> = (props) => {
  // **Props
  const { title, description, seo, regulator = false } = props;
  const t = useTranslation();
  const { locale, query } = useRouter();

  // **Local state
  const size = 8;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    label: t.filters.lastAdded,
    value: "default"
  });

  // **SWR
  const { data } = useSWR(
    `${
      regulator ? "/regulators" : `/categories/${query.slug}`
    }?lang=${locale}&page=${page}&size=${size}&sort=${filter.value}${
      search.length ? `&search=${search}` : ""
    }`
  );

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setPage(1);
  }, [search, filter]);

  return (
    <div className="companies gutter-section-bottom">
      <Container>
        <div className="companies-top">
          <Typography tag="h3" variant="h3">
            {title}
          </Typography>
          {description && (
            <div className="companies-top__description">
              {description.map((text, index) => (
                <Typography
                  key={text + index}
                  tag="p"
                  variant="paragraph2"
                  color="dark"
                >
                  {text}
                </Typography>
              ))}
            </div>
          )}
        </div>
        <BannerLayout contentClassName="companies-wrapper">
          <div className="companies-panel">
            <Search
              value={search}
              onInput={handleInput}
              placeholder={t.bin.search as string}
            />
            <Filter
              value={filter}
              options={[
                { label: t.filters.ratingLow, value: "asc" },
                { label: t.filters.ratingHigh, value: "desc" },
                { label: t.filters.lastAdded, value: "default" }
              ]}
              onChange={(option) => setFilter(option)}
            />
          </div>
          <Table
            data={data?.brokers || data?.data}
            route={regulator ? "regulators" : "broker"}
          />
          <Pagination
            currentPage={page}
            totalPages={(data?.brokersTotal || data?.total) / size}
            handleChangePage={(page) => setPage(page)}
          />
        </BannerLayout>

        {seo && <Seo seo={seo} className="gutter-subsection-top" />}
      </Container>
    </div>
  );
};
