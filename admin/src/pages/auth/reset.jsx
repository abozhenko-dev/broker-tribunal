import { useState } from "react";

import { Button, Form, Input, message } from "antd";
import { AiOutlineMail } from "react-icons/ai";

import { AuthService } from "@services";

import { EMAIL_RULES } from "@utils/constants";

const Reset = () => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const handleSubmit = async (data) => {
    setLoading(true);

    const resetResp = await AuthService.reset(data);

    setLoading(false);

    if (resetResp.status === 200) {
      message.success("На Вашу почту была отправлена ссылка для сброса пароля!");

      form.resetFields();
    } else {
      message.error(
        resetResp.response?.data?.message === "userNotExist"
          ? "Такого юзера не существует!"
          : "Не удалось отправить!"
      );
    }
  };

  return (
    <Form form={form} layout="vertical" name="reset-form" onFinish={handleSubmit}>
      <Form.Item name="email" label="Email" rules={EMAIL_RULES}>
        <Input prefix={<AiOutlineMail />} size="large" />
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
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Reset;
