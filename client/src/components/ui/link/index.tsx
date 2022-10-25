import { FC, ReactNode } from "react";

import NextLink from "next/link";

import { IIcons } from "@declarations";

import { ICONS } from "@constants";

interface LinkProps {
  native?: boolean;
  variant?: "default" | "border";
  icon?: keyof IIcons;
  iconVariant?: "primary" | "ghost";
  className?: string;
  asBtn?: boolean;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
}

export const Link: FC<LinkProps> = (props) => {
  // **Props
  const {
    native = false,
    icon,
    variant = "default",
    iconVariant = "ghost",
    className,
    href,
    asBtn,
    onClick,
    children
  } = props;

  const getClasses = () => {
    let classes = className ? `link ${className}` : "link";

    if (icon) {
      classes += " icon";

      switch (iconVariant) {
        case "primary": {
          classes += " icon-primary";
          break;
        }
        default: {
          classes += " icon-ghost";
          break;
        }
      }
    }

    switch (variant) {
      case "border": {
        classes += " border";
        break;
      }
      default: {
        break;
      }
    }

    return classes;
  };

  if (asBtn) {
    return (
      <button className={getClasses()} onClick={onClick}>
        <span className="text">{children}</span>
        {icon && <span className="icon">{ICONS[icon]}</span>}
      </button>
    );
  }

  if (native) {
    return (
      <a href={href} className={getClasses()}>
        <span className="text">{children}</span>
        {icon && <span className="icon">{ICONS[icon]}</span>}
      </a>
    );
  }

  return (
    <NextLink href={href}>
      <a className={getClasses()}>
        <span className="text">{children}</span>
        {icon && <span className="icon">{ICONS[icon]}</span>}
      </a>
    </NextLink>
  );
};
