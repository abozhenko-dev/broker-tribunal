import { FC, InputHTMLAttributes, ReactNode } from "react";

import { useFormContext } from "react-hook-form";

export interface SelectorProps extends InputHTMLAttributes<HTMLInputElement> {
  type: "radio" | "checkbox";
  name: string;
  value: string | number;
  label?: string | ReactNode;
}

export const Selector: FC<SelectorProps> = (props) => {
  // **Props
  const { type, label, name, value, ...rest } = props;

  // Form
  const { register, formState } = useFormContext();

  const getClasses = () => {
    let className = "form-selector";

    if (formState.errors[name]) {
      className += " error";
    }

    return className;
  };

  return (
    <div className={getClasses()}>
      <label className="form-selector__label">
        <input
          className="form-selector__input"
          type={type}
          value={value}
          {...register(name)}
          {...rest}
        />
        <span className="form-selector__btn">{label}</span>
      </label>
    </div>
  );
};
