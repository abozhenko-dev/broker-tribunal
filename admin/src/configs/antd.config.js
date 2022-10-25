import { message, notification } from "antd";

export const configureAntd = () => {
  message.config({
    maxCount: 5
  });

  notification.config({
    maxCount: 5
  });
};
