import { ElementType, FC } from "react";

import Link from "next/link";

import dayjs from "dayjs";

import { Image, Typography } from "@components/ui";

import { IArticle, INews } from "@declarations";

import { ICONS } from "@constants";

interface ArticleCardProps {
  tag?: ElementType;
  noDescription?: boolean;
  direction?: "vertical" | "horizontal";
  imgWidth: number;
  imgHeight: number;
  article: IArticle | INews;
  route?: string;
}

export const ArticleCard: FC<ArticleCardProps> = (props) => {
  // **Props
  const {
    tag: Tag = "div",
    noDescription = false,
    direction = "vertical",
    imgWidth,
    imgHeight,
    article,
    route = "blog"
  } = props;
  const isVertical = direction === "vertical";

  const getClasses = () => {
    let classes = "article-card";

    if (direction === "horizontal") {
      classes += " horizontal";
    }

    return classes;
  };

  return (
    <Tag className={getClasses()}>
      <div className="article-card__image">
        <Link href={`/${route}/${article.slug}`}>
          <a>
            <Image
              src={`https://brokerrrr.b-cdn.net/${article.poster?.link}`}
              width={imgWidth}
              height={imgHeight}
              title={article.poster?.meta?.title || article.title}
              alt={article.poster?.meta?.alt || article.title}
            />
          </a>
        </Link>
      </div>
      <div className="article-card__content">
        <ul className="article-card__tags">
          {article.tags.map((tag) => (
            <Typography
              key={tag}
              tag="li"
              variant="caption"
              className="article-card__tag"
            >
              {tag}
            </Typography>
          ))}
        </ul>
        <Typography
          className="article-card__title"
          variant={isVertical ? "h5" : "body1"}
          title={article.title}
        >
          <Link href={`/${route}/${article.slug}`}>
            <a>{article.title}</a>
          </Link>
        </Typography>
        <Typography
          className="article-card__details"
          variant="paragraph2"
          color="grey"
        >
          <div className="article-card__detail">
            <span className="icon">{ICONS.calendar}</span>{" "}
            {dayjs(article.createdDate).format("D.MM.YYYY HH:mm")}
          </div>
          <div className="article-card__detail">
            <span className="icon">{ICONS.views}</span> {article.views}
          </div>
        </Typography>
        {!noDescription && isVertical && article.shortDescription && (
          <Typography
            className="article-card__description"
            variant="paragraph2"
            color="dark"
            title={article.shortDescription}
          >
            {article.shortDescription}
          </Typography>
        )}
      </div>
    </Tag>
  );
};
