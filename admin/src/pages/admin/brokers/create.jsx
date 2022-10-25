import { useEffect, useMemo, useState } from "react";

import { Form as AntForm, Button, Card, Tabs, message } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import { BrokersService, CategoriesService } from "@services";

import { useRequests } from "@hooks";

import { FORM_LAYOUT } from "@utils/constants";
import { submitter } from "@utils/helpers";

import { Images } from "./components/images";
import { Main } from "./components/main";
import { Metadata } from "./components/metadata";

const BrokersCreate = () => {
  // **Props
  const navigate = useNavigate();

  const [form] = AntForm.useForm();
  const lang = AntForm.useWatch("lang", form);

  const { handleRequest } = useRequests();

  const [categories, setCategories] = useState([]);
  const filteredCategories = useMemo(
    () => categories.filter((category) => category.lang === lang),
    [lang, categories]
  );

  const dataFetch = handleRequest(async () => {
    const resp = await CategoriesService.getAll();

    if (resp.status !== 200) {
      throw resp;
    }

    setCategories(resp?.data.data);
  });

  const handleFinish = async (values) => {
    try {
      values.faqs = values.faqs
        ?.filter(({ title, content }) => title && content)
        .map((faq) => ({
          title: faq.title,
          content: faq.content?.split(/[\n\\]/)?.filter((value) => value)
        }));

      values.isInCatalog = values.isInCatalog || false;

      const resp = await BrokersService.create({
        ...values,
        foundingDate: dayjs(new Date()).toISOString()
      });

      if (resp.status !== 200) {
        throw resp;
      }

      message.success("Записи успешно сохранены!");
      navigate("/brokers");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    form.resetFields(["categories"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    dataFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card
      title="Создать брокера"
      className="card_with-tabs"
      extra={
        <Button type="primary" htmlType="submit" size="large" block onClick={submitter(form)}>
          Создать
        </Button>
      }
    >
      <AntForm {...FORM_LAYOUT} form={form} name="brokers-create" onFinish={handleFinish}>
        <Tabs defaultActiveKey="main">
          <Tabs.TabPane tab="Основное" key="main" forceRender>
            <Main categories={filteredCategories} lang={lang} />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Метаданные" key="metadata" forceRender>
            <Metadata />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Изображение" key="image" forceRender>
            <Images />
          </Tabs.TabPane>
        </Tabs>
      </AntForm>
    </Card>
  );
};

export default BrokersCreate;
