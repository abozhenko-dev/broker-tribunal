import { useEffect } from "react";

import { Form as AntForm, Button, Card, Spin, Tabs, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { Form } from "@components";

import { RegulatorsService } from "@services";

import { useRequests } from "@hooks";

import { submitter } from "@utils/helpers";

import { Images } from "./components/images";
import { Main } from "./components/main";
import { Metadata } from "./components/metadata";

const RegulatorsEdit = () => {
  // **Props
  const { id } = useParams();
  const navigate = useNavigate();

  const [form] = AntForm.useForm();

  const { handleRequest, isLoading } = useRequests();

  const handleFinish = async (values) => {
    try {
      values.faqs = values.faqs
        ?.filter(({ title, content }) => title && content)
        .map((faq) => ({
          title: faq.title,
          content: faq?.content?.split("\n")?.filter((value) => value)
        }));

      const resp = await RegulatorsService.update(values._id, values);

      if (resp.status !== 200) {
        throw resp;
      }

      message.success("Записи успешно сохранены!");
      navigate("/regulators");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const setInitials = handleRequest(async () => {
    const resp = await RegulatorsService.getOne(id);

    if (resp.status !== 200) {
      throw resp;
    }
    form.setFieldsValue({
      ...resp.data,
      logo: [resp.data.logo],
      faqs: resp.data.faqs.map((faq) => ({ title: faq.title, content: faq.content.join("\n") }))
    });
  });

  useEffect(() => {
    setInitials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Spin spinning={isLoading}>
      <Card
        title="Редактирование регулятора"
        extra={
          <Button type="primary" htmlType="submit" size="large" block onClick={submitter(form)}>
            Редактировать
          </Button>
        }
      >
        <Form form={form} name="regulators-edit" onFinish={handleFinish}>
          <Tabs defaultActiveKey="main">
            <Tabs.TabPane tab="Основное" key="main" forceRender>
              <Main withId />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Метаданные" key="metadata" forceRender>
              <Metadata />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Изображение" key="image" forceRender>
              <Images />
            </Tabs.TabPane>
          </Tabs>
        </Form>
      </Card>
    </Spin>
  );
};

export default RegulatorsEdit;
