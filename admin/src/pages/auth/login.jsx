import { useState } from "react";

import { Button, Form, Input, message } from "antd";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { DEFAULT_ROUTE } from "@routes";

import { AuthService } from "@services";

import { useActions } from "@hooks";

import { EMAIL_RULES, PASSWORD_RULES } from "@utils/constants";

const Login = () => {
  const { setUserInfo, setIsAuthorized } = useActions();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setLoading(true);

    const loginResp = await AuthService.login(data);

    setLoading(false);

    if (loginResp.status === 200) {
      const userResp = await AuthService.getUserInfo();
      setUserInfo(userResp.data);
      setIsAuthorized(true);

      navigate(`/${DEFAULT_ROUTE}`);
      message.success("Вы вошли 😌");
    } else {
      message.error("Что-то пошло не так!");
    }
  };

  return (
    <>
      <Form layout="vertical" name="login-form" onFinish={handleSubmit}>
        <Form.Item name="email" label="Email" rules={EMAIL_RULES}>
          <Input prefix={<AiOutlineMail />} size="large" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={PASSWORD_RULES}>
          <Input.Password prefix={<AiOutlineLock />} size="large" />
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
            Войти
          </Button>
        </Form.Item>
      </Form>
      <Button
        type="link"
        size="large"
        href="/auth/reset"
        style={{ display: "flex", justifyContent: "center" }}
      >
        Забыли пароль?
      </Button>
    </>
  );
};

export default Login;
