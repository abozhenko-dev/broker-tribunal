import { FC, ReactNode, useState } from "react";

import { BannerCard } from "@components/cards";
import { ConsultationModal } from "@components/modals";
import { Button, Link, Typography } from "@components/ui";

import { useTranslation } from "@hooks";

interface BannerLayoutProps {
  contentClassName?: string;
  children: ReactNode;
}

export const BannerLayout: FC<BannerLayoutProps> = (props) => {
  // **Props
  const { contentClassName, children } = props;
  const t = useTranslation();

  // **Local state
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="layout-banner">
        <div
          className={
            contentClassName
              ? `layout-content ${contentClassName}`
              : "layout-content"
          }
        >
          {children}
        </div>
        <div className="layout-sidebar">
          <BannerCard>
            <Typography variant="h5" className="title">
              {t.bin.freeConsultation}
            </Typography>
            <Typography
              variant="paragraph2"
              color="dark"
              className="description"
            >
              {t.bin.leaveYourData}
            </Typography>
            <Button fullWidth className="action" onClick={handleOpen}>
              {t.bin.orderConsultation}
            </Button>
          </BannerCard>
          <BannerCard imgSrc="media/illustrations/banner-person.svg">
            <Typography variant="h5" className="title">
              {t.bin.choosingBroker}
            </Typography>
            <Typography
              variant="paragraph2"
              color="dark"
              className="description"
              style={{ paddingRight: "3rem" }}
            >
              {t.bin.orderFreeConsultation}
            </Typography>
            <Link asBtn icon="arrow" className="action" onClick={handleOpen}>
              {t.bin.learnMore}
            </Link>
          </BannerCard>
          <BannerCard
            imgSrc="media/illustrations/banner-coins.svg"
            style={{ minHeight: "27.6rem" }}
          >
            <Typography variant="h5" className="title">
              {t.bin.insureRisks}
            </Typography>
            <Typography
              variant="paragraph2"
              color="dark"
              className="description"
            >
              {t.bin.insureYourWallet}
            </Typography>
            <Button fullWidth className="action" onClick={handleOpen}>
              {t.bin.freeConsultation}
            </Button>
          </BannerCard>
        </div>
      </div>
      <ConsultationModal visible={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
