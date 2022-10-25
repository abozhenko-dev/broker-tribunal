import { ElementType, FC, HTMLAttributes } from "react";

import { ArticleCard } from "@components/cards";
import { Container, Typography } from "@components/ui";

import { useTranslation } from "@hooks";

import { IArticle, INews } from "@declarations";

interface SimilarNewsProps extends HTMLAttributes<HTMLDivElement> {
  articles: IArticle[] | INews[];
  titleTag?: ElementType;
}

export const SimilarNews: FC<SimilarNewsProps> = (props) => {
  // **Props
  const { articles, titleTag, className, ...rest } = props;
  const t = useTranslation();

  if (articles.length === 0) {
    return null;
  }

  return (
    <div
      className={className ? `similar-news ${className}` : "similar-news"}
      {...rest}
    >
      <Container>
        <Typography tag={titleTag} variant="h3">
          {t.bin.similarNews}
        </Typography>
        <div className="similar-news__wrapper">
          {articles.map((article) => (
            <ArticleCard
              key={article._id}
              article={article}
              noDescription
              imgWidth={256}
              imgHeight={156}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};
