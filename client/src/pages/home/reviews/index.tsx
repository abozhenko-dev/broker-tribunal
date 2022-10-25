import { FC, useState } from "react";

import { useRouter } from "next/router";

import useSWR from "swr";

import { ReviewCard } from "@components/cards";
import { ConsultationModal } from "@components/modals";
import { Button, Container, Link, Typography } from "@components/ui";

import { useTranslation } from "@hooks";

import { IOverviewCategory } from "@declarations";

export const Reviews: FC = () => {
  // **Props
  const t = useTranslation();
  const { locale } = useRouter();

  // **Local state
  const [isOpen, setIsOpen] = useState(false);

  // **SWR
  const { data } = useSWR<IOverviewCategory>(
    `/overviews-categories/main?lang=${locale}`
  );

  if (!data) {
    return null;
  }

  return (
    <>
      <div className="home-reviews gutter-section-top gutter-section-bottom">
        <Container>
          <div className="home-reviews__top gutter-head">
            <Typography tag="h2" variant="h2">
              {data.name}
            </Typography>
            <Link href={`/overview/${data.slug}`} icon="arrow">
              {t.bin.seeAllReviews}
            </Link>
          </div>
          <ul className="home-reviews__list">
            {data.overviews.map((overview) => (
              <ReviewCard
                key={overview._id}
                category={data.slug}
                item={overview}
                tag="li"
              />
            ))}

            <li className="action">
              <Typography variant="h4">{t.bin.returnMoney}</Typography>
              <Typography variant="paragraph2" color="dark">
                {t.bin.freeAnalysis}
              </Typography>
              <Button
                variant="primary"
                fullWidth
                onClick={() => setIsOpen(true)}
              >
                {t.bin.freeConsultation}
              </Button>
            </li>
          </ul>
          <Link href={`/overview/${data.slug}`} icon="arrow" variant="border">
            {t.bin.seeAllReviews}
          </Link>
        </Container>
      </div>
      <ConsultationModal visible={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
