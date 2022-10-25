import { useEffect } from "react";

import { Button, Card, Form, message } from "antd";
import { useNavigate } from "react-router-dom";

import { ContactsService } from "@services";

import { useRequests } from "@hooks";

import { FORM_LAYOUT } from "@utils/constants";
import { finishFailedHandler, submitter } from "@utils/helpers";

import { Main } from "./components/main";

const ContactsEdit = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const { handleRequest, isLoading } = useRequests();

  const handleFinish = handleRequest(async (values) => {
    const resp = await ContactsService.update(values);
    if (resp.status !== 200) throw resp;

    message.success("Запись успешно сохранена!");
    navigate("/contacts");
  });

  const fetchData = handleRequest(async () => {
    const resp = await ContactsService.getOne();
    if (resp.status !== 200) throw resp;

    form.setFieldsValue(resp.data);
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card
      title="Редактировать контакты"
      loading={isLoading}
      extra={
        <Button onClick={submitter(form)} type="primary" htmlType="submit" block>
          Редактировать
        </Button>
      }
    >
      <Form
        {...FORM_LAYOUT}
        form={form}
        name="contact-edit"
        labelWrap
        onFinish={handleFinish}
        onFinishFailed={finishFailedHandler}
      >
        <Main />
      </Form>
    </Card>
  );
};

export default ContactsEdit;
