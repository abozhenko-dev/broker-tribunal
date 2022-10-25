import { FC } from "react";

import { ITranslation } from "@declarations";
import { useFormContext } from "react-hook-form";

import { useTranslation } from "@hooks";

import { findDeepValue } from "@helpers";

interface ErrorProps {
  name: string;
}

export const Error: FC<ErrorProps> = (props) => {
  // **Props
  const { name } = props;
  const t = useTranslation();

  // **Form
  const {
    formState: { errors }
  } = useFormContext();

  const messageKey: keyof ITranslation["validation"] = findDeepValue(
    errors,
    name
  )?.message;

  return (
    <>
      {messageKey && (
        <span className="form-error">{t.validation[messageKey]}</span>
      )}
    </>
  );
};
