import { FC, useState } from "react";

import { BannerLayout } from "@layouts";

import { ComplaintForm } from "@components/common";
import { ConsultationModal } from "@components/modals";
import { Button, Container, Image, Typography } from "@components/ui";

import { useTranslation } from "@hooks";

import { IOverview } from "@declarations";

export const OverviewArticle: FC<{ overview: IOverview }> = (props) => {
  // **Props
  const { overview } = props;
  const t = useTranslation();

  // **Local state
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="overview-article">
        <Container>
          <div className="overview-article__top">
            <div className="overview-article__top-image">
              <Image
                src={`https://brokerrrr.b-cdn.net/${overview.logo?.link}`}
                width={188}
                height={95}
                alt={overview.logo.meta?.alt || overview.title}
                title={overview.logo.meta?.title || overview.title}
              />
            </div>
            <div className="overview-article__top-content">
              <Typography tag="h1" variant="h3">
                {overview.title}
              </Typography>
              <Button
                size="L"
                variant="primary"
                onClick={() => setIsOpen(true)}
              >
                {t.bin.returnMoney}
              </Button>
            </div>
          </div>
        </Container>
        <div className="overview-article__bottom gutter-subsection-top gutter-section-bottom">
          <Container>
            <BannerLayout contentClassName="overview-article__wrapper">
              <div dangerouslySetInnerHTML={{ __html: overview.content }}></div>
            </BannerLayout>
          </Container>
        </div>
      </div>
      <ComplaintForm />
      <ConsultationModal visible={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
