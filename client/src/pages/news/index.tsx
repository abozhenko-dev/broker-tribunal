import { FC } from "react";

import { LastNews } from "@components/common";

import { ITag } from "@declarations";

import { News as NewsSection } from "./news";

interface NewsProps {
  tags: ITag[];
}

export const News: FC<NewsProps> = (props) => {
  // **Props
  const { tags } = props;

  return (
    <>
      <LastNews />
      <NewsSection tags={tags} />
    </>
  );
};
