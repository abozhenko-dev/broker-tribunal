import { FC } from "react";

import { Container } from "@components/ui";

export const Partners: FC<{ content: string }> = (props) => {
  // **Props
  const { content } = props;

  return (
    <div className="partners gutter-section-bottom">
      <Container>
        <div
          className="partners-wrapper"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </Container>
    </div>
  );
};
