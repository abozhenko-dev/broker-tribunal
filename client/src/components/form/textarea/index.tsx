/* eslint-disable @next/next/no-img-element */
import { FC, InputHTMLAttributes } from "react";

import { Controller, useFormContext } from "react-hook-form";

import { useTranslation } from "@hooks";

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
}

export interface ControlledTextareaProps extends TextareaProps {
  name: string;
}

export const TextArea: FC<TextareaProps> = (props) => {
  // **Props
  const { label, disabled = false, error, helperText, ...rest } = props;

  const getClasses = () => {
    let className = "form-textarea";

    if (error) {
      className += " error";
    }

    if (disabled) {
      className = "form-textarea disabled";
    }

    return className;
  };

  return (
    <div className={getClasses()}>
      <label className="form-textarea__wrapper">
        {label && <span className="form-textarea__label">{label}</span>}
        <textarea disabled={disabled} {...rest} />
      </label>
      {helperText && <span className="form-error">{helperText}</span>}
    </div>
  );
};

export const ControlledTextarea: FC<ControlledTextareaProps> = (props) => {
  // **Props
  const { name, ...rest } = props;
  const t = useTranslation();

  // **Form
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextArea
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
