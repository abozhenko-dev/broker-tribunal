import { FC } from "react";

import { Button, Container, HtmlImage, Typography } from "@components/ui";

import { useTranslation } from "@hooks";

export const Hero: FC = () => {
  // **Props
  const t = useTranslation();

  return (
    <>
      <div className="hero">
        <Container>
          <div className="hero__info">
            <Typography tag="h1" variant="h1">
              {t.bin.manyScammers}
            </Typography>
            <div className="hero__text">
              <Typography tag="p" variant="paragraph2">
                {t.bin.orderFreeConsultation}
              </Typography>
            </div>
            <Button variant="primary" size="L">
              {t.bin.consultation}
            </Button>
          </div>
          <div className="hero-background">
            <HtmlImage
              src="/media/illustrations/finans.svg"
              width={698}
              height={584}
              alt=""
              aria-hidden={true}
            />
          </div>
        </Container>
      </div>
    </>
  );
};
