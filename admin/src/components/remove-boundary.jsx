import { Popconfirm, message } from "antd";

export const RemoveBoundary = (props) => {
  const {
    onSuccessMessage = "Запись успешно удалена!",
    onErrorMessage = "Не удалось удалить запись 😔",
    title = "Вы уверены, что хотите удалить запись?",
    okText = "Да",
    cancelText = "Нет",
    placement = "topRight",
    handler,
    isApiHandler = true,
    onSuccess,
    children
  } = props;

  const remove = async () => {
    try {
      const resp = await handler();

      if (resp.status !== 200) {
        throw resp;
      }

      message.success(onSuccessMessage);

      if (onSuccess) onSuccess();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("RemoveBoundary:", err);
      message.error(onErrorMessage);
    }
  };

  return (
    <Popconfirm
      placement={placement}
      title={title}
      onConfirm={isApiHandler ? remove : () => handler()}
      okText={okText}
      cancelText={cancelText}
    >
      {children}
    </Popconfirm>
  );
};
