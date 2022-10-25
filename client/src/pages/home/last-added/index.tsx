import { FC } from "react";

import NextLink from "next/link";
import { useRouter } from "next/router";

import dayjs from "dayjs";
import useSWR from "swr";

import { Container, Image, Link, Typography } from "@components/ui";

import { useTranslation } from "@hooks";

import { ICompany } from "@declarations";

export const LastAdded: FC = () => {
  // **Props
  const t = useTranslation();
  const { locale } = useRouter();

  // **SWR
  const { data } = useSWR<ICompany[]>(`/brokers/new?lang=${locale}`);

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="last-added gutter-section-top">
      <Container>
        <div className="last-added__top gutter-head">
          <Typography tag="h2" variant="h2">
            {t.bin.lastAddedBrokers}
          </Typography>
          {/* <Link href="/brokers" icon="plus" iconVariant="primary">
            {t.bin.addBroker}
          </Link> */}
        </div>
        <ul className="last-added__list">
          {data?.map((company) => (
            <li key={company._id} className="last-added__item">
              <div className="last-added__item-image">
                <NextLink href={`/broker/${company.slug}`}>
                  <a>
                    <Image
                      src={`https://brokerrrr.b-cdn.net/${company.logo?.link}`}
                      width={164}
                      height={140}
                      alt={company.logo?.meta?.alt || company.name}
                      title={company.logo?.meta?.title || company.name}
                    />
                  </a>
                </NextLink>
              </div>
              <div className="last-added__item-content">
                <div className="last-added__item-foundation">
                  <Typography variant="caption" color="grey">
                    {t.bin.establish}
                  </Typography>
                  <Typography variant="caption" color="grey">
                    {dayjs(company.foundingDate).format("YYYY")}
                  </Typography>
                </div>
                <Link href={`/broker/${company.slug}`} icon="arrow">
                  {t.bin.reviewBroker}
                </Link>
              </div>
            </li>
          ))}
        </ul>
        {/* <Link
          href="/brokers"
          icon="plus"
          iconVariant="primary"
          variant="border"
        >
          {t.bin.addBroker}
        </Link> */}
      </Container>
    </div>
  );
};
