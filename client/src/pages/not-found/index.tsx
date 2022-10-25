import { FC } from "react";

import { Button, Container, HtmlImage, Typography } from "@components/ui";

import { useTranslation } from "@hooks";

export const NotFound: FC = () => {
  // **Props
  const t = useTranslation();

  return (
    <div className="not-found gutter-subsection-top gutter-section-bottom">
      <Container>
        <div className="not-found__wrapper">
          <HtmlImage
            src="/media/illustrations/404.svg"
            width={1036}
            height={554}
            aria-hidden={true}
          />
          <div className="not-found__content">
            <Typography tag="h1" variant="h1">
              {t.bin.notFoundTitle}
            </Typography>
            <Typography color="dark">{t.bin.notFoundDescription}</Typography>
            <Button variant="primary" href="/">
              {t.bin.goToMain}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
