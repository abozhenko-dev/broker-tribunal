import { FC } from "react";

import { BenefitCard } from "@components/cards";
import { Button, Container, Typography } from "@components/ui";

import { useTranslation } from "@hooks";

export const Attention: FC = () => {
  // **Props
  const t = useTranslation();

  return (
    <div className="attention gutter-section-bottom gutter-section-top">
      <Container>
        <div className="attention__info">
          <Typography tag="h2" variant="h2">
            {t.bin.payAttentionTo}
          </Typography>
          <Typography tag="p" color="dark">
            {t.bin.inform}
          </Typography>
        </div>

        <ul className="attention__list">
          {t.cards.chooseBroker.map((card, index) => (
            <BenefitCard
              key={card.title}
              tag="li"
              title={card.title}
              description={card.description}
              src={`media/icons/consultation/broker-${index + 1}.svg`}
            />
          ))}
        </ul>
        <Button variant="primary" size="L">
          Заказать консультанию сейчас
        </Button>
      </Container>
    </div>
  );
};
