import { useState } from "react";

import { Button, Form, Input, message } from "antd";
import { AiOutlineLock } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

import { AuthService } from "@services";

import { PASSWORD_RULES } from "@utils/constants";

const ResetFinish = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    if (data.password !== data.passwordConfirm) {
      message.error("Пароли не совпадают!");
      return;
    }

    setLoading(true);

    const resetResp = await AuthService.resetFinish({
      ...data,
      token
    });

    setLoading(false);

    if (resetResp.status === 200) {
      message.success("Пароль успешно изменен!");
      navigate("/auth/login");
    } else {
      message.error("Не удалось отправить!");
    }
  };

  return (
    <Form layout="vertical" name="reset-finish-form" onFinish={handleSubmit}>
      <Form.Item name="password" label="Пароль" rules={PASSWORD_RULES}>
        <Input prefix={<AiOutlineLock />} size="large" type="password" />
      </Form.Item>
      <Form.Item name="passwordConfirm" label="Подтверждение пароля" rules={PASSWORD_RULES}>
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
  );
};

export default ResetFinish;
