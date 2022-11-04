import { FC } from "react";

import Link from "next/link";

import dayjs from "dayjs";

import { Rating } from "@components/common";
import { Image, Typography } from "@components/ui";

import { useTranslation } from "@hooks";

import { ICompany } from "@declarations";

interface TableProps {
  data: ICompany[];
  route?: string;
}

export const Table: FC<TableProps> = (props) => {
  // **Props
  const { data, route = "broker" } = props;
  const t = useTranslation();

  return (
    <div className="companies-list">
      <div className="companies-table">
        <div className="companies-table__head">
          <div className="companies-table__head-cell">{t.bin.companyName}</div>
          <div className="companies-table__head-cell">
            {t.bin.mainInformation}
          </div>
        </div>
        <div className="companies-table__body">
          {data?.map((item) => (
            <div key={item._id} className="companies-table__body-row">
              <div className="companies-table__body-cell left">
                <div className="companies-table__item">
                  <Link href={`/${route}/${item.slug}`}>
                    <a>
                      <div className="companies-table__item-image">
                        <Image
                          src={`${item.logo?.link}`}
                          width={68}
                          height={39}
                          alt={item.logo.meta?.alt || item.name}
                          title={item.logo.meta?.title || item.name}
                        />
                      </div>
                      <div className="companies-table__item-content">
                        <Typography>{item.name}</Typography>
                        <Rating rating={item.rating} withCaption width={80} />
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="companies-table__body-cell right">
                <div className="companies-table__info">
                  <Typography variant="paragraph2" color="grey">
                    {t.bin.establish}
                  </Typography>
                  <Typography variant="paragraph2">
                    {dayjs(item.foundingDate).format("YYYY")}
                  </Typography>
                </div>
                {item.info?.country && (
                  <div className="companies-table__info">
                    <Typography variant="paragraph2" color="grey">
                      {t.bin.country}
                    </Typography>
                    <Typography variant="paragraph2">
                      {item.info.country}
                    </Typography>
                  </div>
                )}
                <div className="companies-table__info">
                  <Typography variant="paragraph2" color="grey">
                    {t.bin.minDeposit}
                  </Typography>
                  <Typography variant="paragraph2">
                    {item.minDeposit}
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
