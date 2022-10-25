import { ButtonHTMLAttributes, FC, MouseEvent, ReactNode } from "react";

import { useRouter } from "next/router";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: "S" | "M" | "L";
  fullWidth?: boolean;
  href?: string;
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const Button: FC<ButtonProps> = (props) => {
  // **Props
  const {
    variant = "ghost",
    href,
    size = "S",
    fullWidth,
    className,
    children,
    onClick,
    ...rest
  } = props;
  const { push } = useRouter();

  const defineClasses = () => {
    let classes = className ? `button ${className}` : "button";

    switch (variant) {
      case "primary": {
        classes += " primary";
        break;
      }
      default: {
        classes += " ghost";
        break;
      }
    }

    switch (size) {
      case "L": {
        classes += " L";
        break;
      }
      case "M": {
        classes += " M";
        break;
      }
      default: {
        classes += " S";
        break;
      }
    }

    if (fullWidth) {
      classes += " full";
    }

    return classes;
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (href) {
      push(href);
      return;
    }

    if (onClick) onClick(e);
  };

  return (
    <button className={defineClasses()} onClick={handleClick} {...rest}>
      {children}
    </button>
  );
};
