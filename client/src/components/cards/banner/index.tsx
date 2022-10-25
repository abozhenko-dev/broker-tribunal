import { ElementType, FC, HTMLAttributes, ReactNode } from "react";

interface BannerCardProps extends HTMLAttributes<HTMLElement> {
  tag?: ElementType;
  imgSrc?: string;
  children: ReactNode;
}

export const BannerCard: FC<BannerCardProps> = (props) => {
  // **Props
  const { tag: Tag = "div", imgSrc, children, style, ...rest } = props;

  return (
    <Tag
      className="banner-card"
      style={imgSrc ? { backgroundImage: `url("${imgSrc}")`, ...style } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
};
