import { useState } from "react";

import { Button, Card, Form, Input, message } from "antd";
import { AiOutlineLock } from "react-icons/ai";

import { AuthService } from "@services";

import { PASSWORD_RULES } from "@utils/constants";

const PasswordReset = () => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const handleSubmit = async (data) => {
    if (data.newPassword !== data.newPasswordConfirm) {
      message.error("Пароли не совпадают!");
      return;
    }

    setLoading(true);

    const resetResp = await AuthService.changePassword(data);

    setLoading(false);

    if (resetResp.status === 200) {
      message.success("Пароль успешно изменен!");
      form.resetFields();
    } else {
      message.error("Не удалось отправить!");
    }
  };

  return (
    <Card title="Смена пароля" style={{ maxWidth: "500px", width: "100%", margin: "0 auto" }}>
      <Form layout="vertical" name="reset-finish-form" onFinish={handleSubmit}>
        <Form.Item name="oldPassword" label="Старый пароль" rules={PASSWORD_RULES}>
          <Input prefix={<AiOutlineLock />} size="large" type="password" />
        </Form.Item>
        <Form.Item name="newPassword" label="Новый пароль" rules={PASSWORD_RULES}>
          <Input prefix={<AiOutlineLock />} size="large" type="password" />
        </Form.Item>
        <Form.Item
          name="newPasswordConfirm"
          label="Подтверждение нового пароля"
          rules={PASSWORD_RULES}
        >
          <Input prefix={<AiOutlineLock />} size="large" type="password" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            size="large"
            style={{ marginTop: "10px" }}
          >
            Сменить пароль
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PasswordReset;
