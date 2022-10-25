import { FC } from "react";

import { Container } from "@components/ui";

export const Policy: FC<{ content: string }> = (props) => {
  // **Props
  const { content } = props;

  return (
    <div className="policy gutter-section-bottom">
      <Container>
        <div
          className="policy-wrapper"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </Container>
    </div>
  );
};
