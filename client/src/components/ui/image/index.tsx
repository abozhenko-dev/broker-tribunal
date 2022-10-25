/* eslint-disable @next/next/no-img-element */
import { FC, ImgHTMLAttributes } from "react";

import NextImage, { ImageProps as NextImageProps } from "next/future/image";

export const Image: FC<NextImageProps> = (props) => {
  // **Props
  const { src, ...rest } = props;

  return <NextImage src={src} {...rest} />;
};

export const HtmlImage: FC<ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  // **Props
  const { src, loading = "lazy", ...rest } = props;

  // eslint-disable-next-line jsx-a11y/alt-text
  return <img src={src} loading={loading} {...rest} />;
};
