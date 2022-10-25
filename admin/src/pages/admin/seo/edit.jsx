import { useEffect } from "react";

import { Button, Card, Form, message } from "antd";
import { useNavigate } from "react-router-dom";

import { SeoService } from "@services";

import { useRequests } from "@hooks";

import { FORM_LAYOUT } from "@utils/constants";
import { finishFailedHandler, multilangData, submitter } from "@utils/helpers";

import { Main } from "./components/main";

const SeoEdit = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const { handleRequest, isLoading } = useRequests();

  const handleFinish = handleRequest(async (values) => {
    const data = multilangData(values);

    const resp = await SeoService.update(data);
    if (resp.status !== 200) throw resp;

    message.success("Запись успешно сохранена!");
    navigate("/seo");
  });

  const fetchData = handleRequest(async () => {
    const resp = await SeoService.getOne();
    if (resp.status !== 200) throw resp;

    form.setFieldsValue(resp.data);
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card
      title="Редактировать seo"
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

export default SeoEdit;
