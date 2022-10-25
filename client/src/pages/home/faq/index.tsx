/* eslint-disable @next/next/no-img-element */
import { FC } from "react";

import { IFaq } from "@declarations";

import { Accordion } from "@components/common";
import { Container, HtmlImage, Typography } from "@components/ui";

import { useTranslation } from "@hooks";

export const Faq: FC<{ faq: IFaq[] }> = (props) => {
  // **Props
  const { faq } = props;
  const t = useTranslation();

  return (
    <div className="home-faq gutter-section-top">
      <Container>
        <Typography tag="h2" variant="h2" className="gutter-head">
          {t.bin.faq}
        </Typography>
        <div className="home-faq__wrapper">
          <Accordion items={faq} />
        </div>
        <div className="home-faq__illustration">
          <HtmlImage
            src="/media/illustrations/faq.svg"
            width={842}
            height={682}
            alt=""
            aria-hidden={true}
          />
        </div>
      </Container>
    </div>
  );
};
