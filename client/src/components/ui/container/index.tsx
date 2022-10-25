import { FC, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export const Container: FC<ContainerProps> = (props) => {
  // **Props
  const { children } = props;

  return <div className="container">{children}</div>;
};
