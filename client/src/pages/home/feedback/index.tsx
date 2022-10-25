import { FC } from "react";

import Link from "next/link";

import dayjs from "dayjs";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";

import { Rating } from "@components/common";
import { Container, Image, Typography } from "@components/ui";

import { useTranslation } from "@hooks";

import { IReview } from "@declarations";

export const Feedback: FC = () => {
  // **Props
  const t = useTranslation();

  // **SWR
  const { data } = useSWR<IReview[]>("/reviews");

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="feedback">
      <Container>
        <Typography tag="h2" variant="h2" className="gutter-head">
          {t.bin.feedbacks}
        </Typography>
      </Container>
      <div className="feedback-wrapper">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          breakpoints={{
            320: {
              initialSlide: 0,
              centeredSlides: false,
              slidesPerView: 1.1
            },
            576: {
              initialSlide: 0,
              centeredSlides: false,
              slidesPerView: 1.5
            },
            992: {
              initialSlide: 2,
              centeredSlides: true,
              slidesPerView: 2.5
            },
            1200: {
              initialSlide: 2,
              centeredSlides: true,
              slidesPerView: 3.5
            }
          }}
        >
          {data?.map((review) => (
            <SwiperSlide key={review._id} className="feedback-slide">
              <div className="feedback-slide__top">
                <div className="feedback-slide__image">
                  <Image
                    src={`https://brokerrrr.b-cdn.net/${review.entityLogo?.link}`}
                    width={107}
                    height={34}
                    alt=""
                    aria-hidden={true}
                  />
                </div>
                <Rating rating={review.rating} width={100} />
              </div>
              <div className="feedback-slide__content">
                <Typography variant="h5">{review.problem}</Typography>
                <div className="feedback-slide__description">
                  <Typography variant="paragraph2" color="dark">
                    {review.comment}
                  </Typography>
                  <Link
                    href={`/${
                      review.entity === "broker" ? "broker" : "regulators"
                    }/${review.entitySlug}`}
                  >
                    <a>{t.bin.goToFeedback}</a>
                  </Link>
                </div>
                <div className="feedback-slide__credentials">
                  <Typography variant="paragraph2" color="grey">
                    {review.authorName}
                  </Typography>
                  <Typography variant="paragraph2" color="grey">
                    {dayjs(review.createdAt).format("D.MM.YYYY")}
                  </Typography>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
