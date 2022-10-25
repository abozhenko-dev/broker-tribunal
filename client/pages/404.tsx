import { FC } from "react";

import { NotFound } from "@pages";

import { Meta } from "@components/utils";

import { useTranslation } from "@hooks";

export const NotFoundPage: FC = () => {
  // **Props
  const t = useTranslation();

  return (
    <Meta
      meta={{
        title: t.bin.notFoundTitle as string,
        description: t.bin.notFoundDescription as string
      }}
    >
      <NotFound />
    </Meta>
  );
};

export default NotFoundPage;
