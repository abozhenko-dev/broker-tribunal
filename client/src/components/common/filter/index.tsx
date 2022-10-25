import { FC, useRef, useState } from "react";

import { useOnClickOutside } from "@hooks";

import { ICONS } from "@constants";

interface IFilterOption {
  label: string;
  value: string;
}

interface FilterProps {
  value: IFilterOption;
  options: IFilterOption[];
  onChange?: (option: IFilterOption) => void;
}

export const Filter: FC<FilterProps> = (props) => {
  // **Props
  const { value, options, onChange } = props;

  // **Local state
  const [isOpen, setIsOpen] = useState(false);

  // **Ref
  const dropdownRef = useRef<HTMLDivElement>();

  const handleChange = (option: IFilterOption) => () => {
    if (onChange) onChange(option);
  };

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div
      ref={dropdownRef}
      className={isOpen ? "filter open" : "filter"}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <button className="filter-current">
        <span className="text">{value.label}</span>
        <span className="icon">{ICONS.shevron}</span>
      </button>
      <div className="filter-dropdown">
        <ul className="filter-dropdown__list">
          {options.map((option) => (
            <li key={option.value}>
              <button title={option.label} onClick={handleChange(option)}>
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
