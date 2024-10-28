import { notification } from "antd";

export const showNotification = ({ message, type, description }) => {
  notification[type]({
    message: message,
    description: description,
    duration: 5,
  });
};
