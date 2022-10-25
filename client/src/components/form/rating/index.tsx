import { FC } from "react";

import { Controller, useFormContext } from "react-hook-form";

import { Rating } from "@components/common";

import { Error } from "../error";

export interface ControlledRatingProps {
  name: string;
  label: string;
  width?: number;
  disabled?: boolean;
  showError?: boolean;
}

export const ControlledRating: FC<ControlledRatingProps> = (props) => {
  // **Props
  const { name, label, width = 165, showError = true, disabled } = props;

  // **Form
  const formCtx = useFormContext();

  const getClasses = () => {
    let className = "form-rating";

    if (formCtx.formState.errors[name]) {
      className += " error";
    }

    if (disabled) {
      className = "form-rating disabled";
    }

    return className;
  };

  return (
    <div className={getClasses()}>
      <div className="form-rating__label">{label}</div>
      <Controller
        control={formCtx.control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Rating
            rating={value}
            width={width}
            interactive
            onChange={onChange}
          />
        )}
      />
      {showError && formCtx && <Error name={name} />}
    </div>
  );
};
