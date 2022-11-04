import { FC } from "react";

import useSWR from "swr";

import { Container, HtmlImage, Typography } from "@components/ui";

import { useTranslation } from "@hooks";

import { IContacts } from "@declarations";

import { ICONS } from "@constants";

export const Home: FC = () => {
  // **Props
  const t = useTranslation();

  // **SWR
  const { data } = useSWR<IContacts>("/contacts");

  return (
    <div className="home">
      <Container>
        <div className="home-wrapper">
          <div className="home-top">
            <Typography tag="h1" variant="h1">
              {t.bin.independentRating}
            </Typography>
            <a className="home-read--desctop" href={data.telegram}>
              <span className="text">
                {t.bin.readUsIn} <span>{t.socials.telegram.value}</span>
              </span>
              <span className="icon">{ICONS.telegram}</span>
            </a>
          </div>
          <ul className="home-advantages">
            <li>{t.bin.collectReviews}</li>
            <li>{t.bin.helpTraders}</li>
            <li>{t.bin.tradersCommunity}</li>
          </ul>
          <a className="button primary S" href="#complaint">
            {t.bin.leaveComplaint}
          </a>
          <a className="home-read--mobile" href={data.telegram}>
            <span className="icon">{ICONS.telegram}</span>
            <span className="text">
              {t.bin.readUsIn} <span>{t.socials.telegram.value}</span>
            </span>
          </a>
          <ul className="home-statistics">
            <li>
              <span className="numbers">{t.statistics.companies}</span>
              <Typography tag="span" variant="caption">
                {t.bin.companies1}
              </Typography>
            </li>
            <li>
              <span className="numbers">{t.statistics.overviews}</span>
              <Typography tag="span" variant="caption">
                {t.bin.reviews1}
              </Typography>
            </li>
            <li>
              <span className="numbers">{t.statistics.reviews}</span>
              <Typography tag="span" variant="caption">
                {t.bin.feedbacks1}
              </Typography>
            </li>
          </ul>
        </div>
        <div className="home-background">
          <HtmlImage
            src="media/illustrations/hero.svg"
            width={821}
            height={728}
          />
        </div>
      </Container>
    </div>
  );
};
