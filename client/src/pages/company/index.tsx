import { FC, useState } from "react";

import dayjs from "dayjs";

import { BannerCard } from "@components/cards";
import { Accordion, Rating } from "@components/common";
import { ConsultationModal, ReviewModal } from "@components/modals";
import {
  Button,
  Container,
  HtmlImage,
  Image,
  Typography
} from "@components/ui";

import { useTranslation } from "@hooks";

import { ICompany } from "@declarations";

const TABS = ["aboutCompany", "faq1", "feedbacks2"];

interface CompanyProps {
  company: ICompany;
  regulator?: boolean;
}

export const Company: FC<CompanyProps> = (props) => {
  // **Props
  const { company, regulator } = props;
  const t = useTranslation();

  // **Local state
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [isReviwOpen, setIsReviewOpen] = useState(false);
  const [tab, setTab] = useState(TABS[0]);

  return (
    <>
      <div className="company">
        <Container>
          <div className="company-head">
            <Typography tag="h1" variant="h3">
              {company.name}
            </Typography>
            <div className="company-head__rating">
              <Rating rating={company.rating} withCaption width={80} />
            </div>
            <div className="company-info">
              <div className="company-info__image">
                <Image
                  src={`https://brokerrrr.b-cdn.net/${company.logo?.link}`}
                  width={188}
                  height={95}
                  alt={company.logo.meta?.alt || company.name}
                  title={company.logo.meta?.title || company.name}
                />
              </div>
              <ul className="company-info__details">
                <li>
                  <Typography variant="paragraph2" color="grey">
                    {t.bin.jurisdiction}
                  </Typography>
                  <Typography>{company.jurisdiction}</Typography>
                </li>
                <li>
                  <Typography variant="paragraph2" color="grey">
                    {t.bin.minDeposit}
                  </Typography>
                  <Typography>{company.minDeposit}</Typography>
                </li>
                <li>
                  <Typography variant="paragraph2" color="grey">
                    {t.bin.establish}
                  </Typography>
                  <Typography>
                    {dayjs(company.foundingDate).format("YYYY")}
                  </Typography>
                </li>
              </ul>
              <div className="company-info__actions">
                <Button
                  variant="primary"
                  onClick={() => setIsConsultOpen(true)}
                >
                  {t.bin.getMoney}
                </Button>
                <Button onClick={() => setIsReviewOpen(true)}>
                  {t.bin.leaveFeedback}
                </Button>
              </div>
            </div>
            <div className="company-tabs">
              {TABS.map((value) => (
                <button
                  key={value}
                  className={value === tab ? "active" : ""}
                  onClick={() => setTab(value)}
                >
                  {t.bin[value]}
                </button>
              ))}
            </div>
          </div>
        </Container>
        <div className="company-content">
          <Container>
            <div className="company-content__wrapper">
              <div
                className={
                  tab === TABS[0]
                    ? "company-content__body about visible"
                    : "company-content__body about"
                }
              >
                <div
                  className="about"
                  dangerouslySetInnerHTML={{ __html: company.about }}
                ></div>
              </div>
              <div
                className={
                  tab === TABS[1]
                    ? "company-content__body visible"
                    : "company-content__body"
                }
                style={{
                  alignItems: !company.faqs.length ? "center" : "initial"
                }}
              >
                {company.faqs.length === 0 && (
                  <>
                    <HtmlImage
                      src="/media/illustrations/reviews.svg"
                      width={442}
                      height={446}
                      alt=""
                      aria-hidden={true}
                    />
                    <Typography variant="h5">{t.bin.emptyFaq}</Typography>
                  </>
                )}
                {company.faqs.length !== 0 && (
                  <>
                    <Typography variant="h5">{t.bin.faq2}</Typography>
                    <Accordion items={company.faqs} />
                  </>
                )}
              </div>
              <div
                className={
                  tab === TABS[2]
                    ? "company-content__body visible"
                    : "company-content__body"
                }
                style={{
                  alignItems:
                    company.reviews.length === 0 ? "center" : "initial"
                }}
              >
                {company.reviews.length !== 0 && (
                  <>
                    <Typography variant="h5">{t.bin.feedbacks2}</Typography>

                    <ul className="company-reviews">
                      {company.reviews.map((review) => (
                        <li key={review._id} className="company-reviews__item">
                          <div className="company-reviews__item-info">
                            <Typography variant="paragraph2" color="grey">
                              {review.authorName}
                            </Typography>
                            <Typography variant="paragraph2" color="grey">
                              {dayjs(review.createdAt).format("D.MM.YYYY")}
                            </Typography>
                          </div>
                          <Rating rating={review.rating} width={128} />
                          <div className="company-reviews__item-content">
                            <Typography variant="h5">
                              {review.problem}
                            </Typography>
                            <Typography>{review.comment}</Typography>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {company.reviews.length === 0 && (
                  <>
                    <HtmlImage
                      src="/media/illustrations/reviews.svg"
                      width={442}
                      height={446}
                      alt=""
                      aria-hidden={true}
                    />
                    <Typography variant="h5">{t.bin.noReviews}</Typography>
                    <Button
                      className="review"
                      variant="primary"
                      onClick={() => setIsReviewOpen(true)}
                    >
                      {t.bin.leaveFeedback}
                    </Button>
                  </>
                )}
              </div>
              <div className="company-content__sidebar">
                {company?.info &&
                  Object.values(company?.info).filter((value) => value)
                    ?.length !== 0 && (
                    <>
                      <Typography variant="h5">
                        {t.bin.mainInformation}
                      </Typography>
                      <ul className="company-socials">
                        {company?.info?.email && (
                          <li className="company-socials__item">
                            <div className="company-socials__item-icon">
                              <HtmlImage
                                src="/media/icons/mail.svg"
                                width={48}
                                height={48}
                                alt=""
                                aria-hidden={true}
                              />
                            </div>
                            <div className="company-socials__item-content">
                              <Typography variant="paragraph2" color="grey">
                                {t.bin.mail}
                              </Typography>
                              <a
                                href={`mailto:${company.info.email}`}
                                className="company-socials__item-value"
                              >
                                {company.info.email}
                              </a>
                            </div>
                          </li>
                        )}

                        {company?.info?.phone && (
                          <li className="company-socials__item">
                            <div className="company-socials__item-icon">
                              <HtmlImage
                                src="/media/icons/phone.svg"
                                width={48}
                                height={48}
                                alt=""
                                aria-hidden={true}
                              />
                            </div>
                            <div className="company-socials__item-content">
                              <Typography variant="paragraph2" color="grey">
                                {t.bin.phone}
                              </Typography>
                              <a
                                href={`tel:${company.info.phone.replace(
                                  /[()\s-_]/g,
                                  ""
                                )}`}
                                className="company-socials__item-value"
                              >
                                {company.info.phone}
                              </a>
                            </div>
                          </li>
                        )}

                        {company?.info?.country && (
                          <li className="company-socials__item">
                            <div className="company-socials__item-icon">
                              <HtmlImage
                                src="/media/icons/pointer.svg"
                                width={48}
                                height={48}
                                alt=""
                                aria-hidden={true}
                              />
                            </div>
                            <div className="company-socials__item-content">
                              <Typography variant="paragraph2" color="grey">
                                {t.bin.country}
                              </Typography>
                              <div className="company-socials__item-value">
                                {company.info.country}
                              </div>
                            </div>
                          </li>
                        )}

                        {company?.info?.website && (
                          <li className="company-socials__item">
                            <div className="company-socials__item-icon">
                              <HtmlImage
                                src="/media/icons/website.svg"
                                width={48}
                                height={48}
                                alt=""
                                aria-hidden={true}
                              />
                            </div>
                            <div className="company-socials__item-content">
                              <Typography variant="paragraph2" color="grey">
                                {t.bin.site}
                              </Typography>
                              <a
                                href={company.info.website}
                                className="company-socials__item-value"
                              >
                                {company.info.website}
                              </a>
                            </div>
                          </li>
                        )}
                      </ul>
                    </>
                  )}

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
                  <Button
                    fullWidth
                    className="action"
                    onClick={() => setIsConsultOpen(true)}
                  >
                    {t.bin.orderConsultation}
                  </Button>
                </BannerCard>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <ReviewModal
        visible={isReviwOpen}
        params={{
          entity: regulator ? "regulator" : "broker",
          entitySlug: company.slug
        }}
        onClose={() => setIsReviewOpen(false)}
      />
      <ConsultationModal
        visible={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
      />
    </>
  );
};
