import { FC } from "react";

import { BannerLayout } from "@layouts";
import dayjs from "dayjs";

import { ComplaintForm, SimilarNews } from "@components/common";
import { Container, Typography } from "@components/ui";

import { IArticle, INews } from "@declarations";

import { ICONS } from "@constants";

export const Article: FC<{ article?: IArticle; news?: INews }> = (props) => {
  // **Props
  const { article, news } = props;
  const item = article || news;
  const withRelated = Boolean(
    article?.relatedArticles?.length || news?.relatedNews?.length
  );

  return (
    <>
      <div
        className={withRelated ? "article" : "article gutter-section-bottom"}
      >
        <Container>
          <div className="article-top">
            <Typography tag="h1" variant="h3">
              {item.title}
            </Typography>
            <Typography
              className="article-card__details"
              variant="paragraph2"
              color="grey"
            >
              <span className="icon">{ICONS.calendar}</span>{" "}
              {dayjs(item.createdDate).format("D.MM.YYYY HH:mm")}
            </Typography>
            <ul className="article-tags">
              {item.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
          <BannerLayout contentClassName="article-content">
            <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
          </BannerLayout>
        </Container>
      </div>
      {withRelated && (
        <SimilarNews
          articles={article?.relatedArticles || news?.relatedNews}
          className="gutter-subsection-top gutter-section-bottom"
        />
      )}
      <ComplaintForm />
    </>
  );
};
