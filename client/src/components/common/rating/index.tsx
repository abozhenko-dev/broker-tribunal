import { CSSProperties, FC, useEffect, useState } from "react";

import { Typography } from "@components/ui";

import { useTranslation } from "@hooks";

import { ICONS } from "@constants";

interface RatingProps {
  rating: number;
  width?: number;
  interactive?: boolean;
  withCaption?: boolean;
  onChange?: (rating: number) => void;
}

export const Rating: FC<RatingProps> = (props) => {
  // **Props
  const {
    rating = 0,
    width = 110,
    interactive = false,
    withCaption = false,
    onChange
  } = props;
  const defaultRating = (rating * 100) / 5;
  const t = useTranslation();

  // **Local state
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState(defaultRating);

  const calculateRating = (e: any) => {
    const minValue = e.target.getBoundingClientRect().x;
    const { width } = e.target.getBoundingClientRect();

    let result = +((e.clientX - minValue) / (width / 100))?.toFixed(0);

    if (result <= 3) {
      result = 0;
    } else if (result >= 97) {
      result = 100;
    }

    return result;
  };

  const calculateCaptionRating = () => {
    if (hoverRating) {
      return ((hoverRating * 5) / 100).toFixed(1);
    }

    return ((currentRating * 5) / 100).toFixed(1);
  };

  const handleRating = (e: any) => {
    if (!interactive) return;

    if (e.type === "mousemove") {
      setHoverRating(calculateRating(e));
      return;
    }

    if (e.type === "mouseout") {
      setHoverRating(null);
      return;
    }

    setCurrentRating(calculateRating(e));
  };

  useEffect(() => {
    if (!onChange || !interactive) return;

    onChange(+((currentRating * 5) / 100).toFixed(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRating]);

  return (
    <div className="rating">
      {withCaption && (
        <div className="rating-caption">
          <Typography color="grey">{t.bin.rating}</Typography>
          <Typography>{calculateCaptionRating()}</Typography>
        </div>
      )}
      <div
        className="rating-stars"
        style={{ "--width": `${width / 10}rem` } as CSSProperties}
      >
        <div
          className="rating-stars--filled"
          style={
            { "--rating": `${hoverRating || currentRating}%` } as CSSProperties
          }
        >
          <span className="icon">{ICONS["filled-star"]}</span>
          <span className="icon">{ICONS["filled-star"]}</span>
          <span className="icon">{ICONS["filled-star"]}</span>
          <span className="icon">{ICONS["filled-star"]}</span>
          <span className="icon">{ICONS["filled-star"]}</span>
        </div>
        <div
          className="rating-stars--empty"
          onMouseMove={handleRating}
          onMouseOut={handleRating}
          onClick={handleRating}
        >
          <span className="icon">{ICONS["unfilled-star"]}</span>
          <span className="icon">{ICONS["unfilled-star"]}</span>
          <span className="icon">{ICONS["unfilled-star"]}</span>
          <span className="icon">{ICONS["unfilled-star"]}</span>
          <span className="icon">{ICONS["unfilled-star"]}</span>
        </div>
      </div>
    </div>
  );
};
