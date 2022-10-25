/* eslint-disable @next/next/no-img-element */
import { FC, InputHTMLAttributes } from "react";

import { useRouter } from "next/router";

import { Controller, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import de from "react-phone-input-2/lang/de.json";
import ru from "react-phone-input-2/lang/ru.json";

import { Error } from "../error";

const initialCountry: Record<string, string> = {
  de: "de",
  ru: "ru",
  en: "us"
};

const translation: Record<string, any> = {
  de,
  ru,
  // eslint-disable-next-line no-undefined
  en: undefined
};

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  showError?: boolean;
}

export const Phone: FC<InputProps> = (props) => {
  // **Props
  const { name, label, showError = true, disabled, ...rest } = props;
  const { locale } = useRouter();

  // **Form
  const formCtx = useFormContext();

  const getClasses = () => {
    let className = "form-phone";

    if (formCtx.formState.errors[name]) {
      className += " error";
    }

    if (disabled) {
      className = "form-phone disabled";
    }

    return className;
  };

  return (
    <div className={getClasses()}>
      <div className="form-phone__label">{label}</div>
      <Controller
        control={formCtx.control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            inputProps={{
              name,
              ...rest
            }}
            value={value}
            countryCodeEditable={false}
            preferredCountries={["ua", "ru", "de", "us"]}
            country={initialCountry[locale]}
            specialLabel=""
            localization={translation[locale]}
            onChange={(value) => onChange(value)}
          />
        )}
      />
      {showError && formCtx && <Error name={name} />}
    </div>
  );
};
