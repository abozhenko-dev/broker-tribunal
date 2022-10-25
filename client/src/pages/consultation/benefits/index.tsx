import { FC } from "react";

import { BenefitCard } from "@components/cards";
import { Container, Typography } from "@components/ui";

import { useTranslation } from "@hooks";

export const Benefits: FC = () => {
  // **Props
  const t = useTranslation();

  return (
    <div className="benefits gutter-section-bottom gutter-section-top">
      <Container>
        <div className="benefits__info">
          <Typography tag="h2" variant="h2">
            {t.bin.ourAdvantages}
          </Typography>
          <Typography tag="p" color="dark">
            {t.bin.objectiveRating}
          </Typography>
        </div>

        <ul className="benefits__list">
          {t.cards.advantages.map((card, index) => (
            <BenefitCard
              key={card.title}
              tag="li"
              title={card.title}
              description={card.description}
              src={`/media/icons/consultation/advantages-${index + 1}.svg`}
            />
          ))}
        </ul>
      </Container>
    </div>
  );
};
