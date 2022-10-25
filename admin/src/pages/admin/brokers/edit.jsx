import { useEffect, useMemo, useState } from "react";

import { Form as AntForm, Button, Card, Spin, Tabs, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { Form } from "@components";

import { BrokersService, CategoriesService } from "@services";

import { useRequests } from "@hooks";

import { submitter } from "@utils/helpers";

import { Images } from "./components/images";
import { Main } from "./components/main";
import { Metadata } from "./components/metadata";

const BrokersEdit = () => {
  // **Props
  const { id } = useParams();
  const navigate = useNavigate();

  const [form] = AntForm.useForm();

  const { handleRequest, isLoading } = useRequests();
  const [categories, setCategories] = useState([]);

  const filteredCategories = useMemo(
    () => categories.filter((category) => category.lang === form.getFieldValue("lang")),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categories]
  );

  const handleFinish = async (values) => {
    try {
      values.faqs = values.faqs
        ?.filter(({ title, content }) => title && content)
        .map((faq) => ({
          title: faq.title,
          content: faq?.content?.split("\n")?.filter((value) => value)
        }));

      values.isInCatalog = values.isInCatalog || false;

      const resp = await BrokersService.update(values._id, values);

      if (resp.status !== 200) {
        throw resp;
      }

      message.success("Записи успешно сохранены!");
      navigate("/brokers");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const setInitials = handleRequest(async () => {
    const [broker, categories] = await Promise.all([
      BrokersService.getOne(id),
      CategoriesService.getAll()
    ]);

    if (broker.status !== 200) {
      throw broker;
    }

    setCategories(categories.data.data);
    form.setFieldsValue({
      ...broker.data,
      logo: [broker.data.logo],
      faqs: broker.data.faqs.map((faq) => ({ title: faq.title, content: faq.content.join("\n") }))
    });
  });

  useEffect(() => {
    setInitials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Spin spinning={isLoading}>
      <Card
        title="Редактирование брокера"
        extra={
          <Button type="primary" htmlType="submit" size="large" block onClick={submitter(form)}>
            Редактировать
          </Button>
        }
      >
        <Form form={form} name="brokers-edit" onFinish={handleFinish}>
          <Tabs defaultActiveKey="main">
            <Tabs.TabPane tab="Основное" key="main" forceRender>
              <Main categories={filteredCategories} withId />
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

export default BrokersEdit;
