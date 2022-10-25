import { FC } from "react";

import { IIcons } from "@declarations";

import { ICONS } from "@constants";

interface IconProps {
  icon: keyof IIcons;
}

export const Icon: FC<IconProps> = (props) => {
  // **Props
  const { icon } = props;

  return ICONS[icon];
};
