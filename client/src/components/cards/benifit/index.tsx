import { ElementType, FC } from "react";

import { Image, Typography } from "@components/ui";

interface BenefitCardProps {
  title: string;
  description: string;
  src: string;
  tag?: ElementType;
}

export const BenefitCard: FC<BenefitCardProps> = (props) => {
  // **Props
  const { tag: Tag = "div", title, description, src } = props;

  return (
    <Tag className="benefit-item">
      <div className="benefit-item__image">
        <Image src={src} width={48} height={48} alt="Icons" />
      </div>
      <div className="benefit-item__content">
        <Typography tag="h2" variant="h5" className="benefit-item__title">
          {title}
        </Typography>
        <Typography
          variant="paragraph2"
          color="dark"
          className="benefit-item__description"
        >
          {description}
        </Typography>
      </div>
    </Tag>
  );
};
