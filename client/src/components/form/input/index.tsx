/* eslint-disable @next/next/no-img-element */
import { FC, InputHTMLAttributes } from "react";

import { Controller, useFormContext } from "react-hook-form";

import { useTranslation } from "@hooks";

import { ICONS } from "@constants";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
}

export interface ControlledInputProps extends InputProps {
  name: string;
}

export const Input: FC<InputProps> = (props) => {
  // **Props
  const {
    label,
    type = "text",
    disabled = false,
    error,
    helperText,
    ...rest
  } = props;

  const getClasses = () => {
    let className = "form-input";

    if (error) {
      className += " error";
    }

    if (disabled) {
      className = "form-input disabled";
    }

    return className;
  };

  return (
    <div className={getClasses()}>
      {label && <span className="form-input__label">{label}</span>}
      <label className="form-input__wrapper">
        <input type={type} disabled={disabled} {...rest} />

        {error && (
          <span className="form-input__feedback">{ICONS.errorFeedback}</span>
        )}
      </label>
      {helperText && <span className="form-error">{helperText}</span>}
    </div>
  );
};

export const ControlledInput: FC<ControlledInputProps> = (props) => {
  // **Props
  const { name, label, ...rest } = props;
  const t = useTranslation();

  // **Form
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input
          label={label}
          value={field.value || ""}
          onChange={field.onChange}
          error={!!error}
          helperText={t.validation[error?.message]}
          {...rest}
        />
      )}
    />
  );
};
