import { ElementType, FC, HTMLAttributes, ReactNode } from "react";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  tag?: ElementType;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "body1"
    | "paragraph1"
    | "paragraph2"
    | "caption";
  className?: string;
  color?: "dark" | "grey";
  children: ReactNode;
}

export const Typography: FC<TypographyProps> = (props) => {
  // **Props
  const {
    tag: Tag = "div",
    color,
    variant,
    className,
    children,
    ...rest
  } = props;

  const getClasses = () => {
    let classes = className ? `typography ${className}` : "typography";

    switch (variant) {
      case "h1": {
        classes += " h1";
        break;
      }
      case "h2": {
        classes += " h2";
        break;
      }
      case "h3": {
        classes += " h3";
        break;
      }
      case "h4": {
        classes += " h4";
        break;
      }
      case "h5": {
        classes += " h5";
        break;
      }
      case "body1": {
        classes += " body1";
        break;
      }
      case "paragraph1": {
        classes += " paragraph1";
        break;
      }
      case "paragraph2": {
        classes += " paragraph2";
        break;
      }
      case "caption": {
        classes += " caption";
        break;
      }
      default: {
        break;
      }
    }

    switch (color) {
      case "grey": {
        classes += " grey";
        break;
      }
      case "dark": {
        classes += " dark";
        break;
      }
      default: {
        break;
      }
    }

    return classes;
  };

  return (
    <Tag className={getClasses()} {...rest}>
      {children}
    </Tag>
  );
};
