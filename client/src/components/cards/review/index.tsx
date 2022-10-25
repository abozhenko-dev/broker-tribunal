import { ElementType, FC } from "react";

import Link from "next/link";

import { Image, Typography } from "@components/ui";

import { IOverview } from "@declarations";

interface ReviewCardProps {
  item: IOverview;
  category: string;
  tag?: ElementType;
}

export const ReviewCard: FC<ReviewCardProps> = (props) => {
  // **Props
  const { item, category, tag: Tag = "div" } = props;

  return (
    <Tag className="review-card">
      <div className="review-card__image">
        <Link href={`/overview/${category}/${item.slug}`}>
          <a>
            <Image
              src={`https://brokerrrr.b-cdn.net/${item.logo?.link}`}
              width={100}
              height={48}
              alt={item.logo.meta?.alt || item.title}
              title={item.logo.meta?.title || item.title}
            />
          </a>
        </Link>
      </div>
      <div className="review-card__content">
        <Typography
          variant="body1"
          title={item.title}
          className="review-card__title"
        >
          <Link href={`/overview/${category}/${item.slug}`}>
            <a>{item.title}</a>
          </Link>
        </Typography>
        {item.shortDescription && (
          <Typography
            variant="paragraph2"
            color="dark"
            className="review-card__description"
          >
            {item.shortDescription}
          </Typography>
        )}
      </div>
    </Tag>
  );
};
