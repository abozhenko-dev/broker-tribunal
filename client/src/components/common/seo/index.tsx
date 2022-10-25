import { FC, HTMLAttributes } from "react";

import { Container } from "@components/ui";

interface SeoProps extends HTMLAttributes<HTMLDivElement> {
  seo: string;
  withContainer?: boolean;
}

export const Seo: FC<SeoProps> = (props) => {
  // **Props
  const { withContainer = false, seo, className, ...rest } = props;

  return (
    <>
      {withContainer && (
        <div className={className ? `seo ${className}` : "seo"} {...rest}>
          <Container>
            <div
              className="seo-wrapper"
              dangerouslySetInnerHTML={{ __html: seo }}
            ></div>
          </Container>
        </div>
      )}
      {!withContainer && (
        <div className={className ? `seo ${className}` : "seo"} {...rest}>
          <div
            className="seo-wrapper"
            dangerouslySetInnerHTML={{ __html: seo }}
          ></div>
        </div>
      )}
    </>
  );
};
