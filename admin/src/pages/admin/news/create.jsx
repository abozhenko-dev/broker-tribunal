import { useEffect, useMemo, useState } from "react";

import { Form as AntForm, Button, Card, Tabs, message } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import { NewsService, NewsTagsService } from "@services";

import { useRequests } from "@hooks";

import { FORM_LAYOUT } from "@utils/constants";
import { submitter } from "@utils/helpers";

import { Images } from "./components/images";
import { Main } from "./components/main";
import { Metadata } from "./components/metadata";

const NewsCreate = () => {
  // **Props
  const navigate = useNavigate();

  const [form] = AntForm.useForm();
  const lang = AntForm.useWatch("lang", form);

  const { handleRequest } = useRequests();

  const [tags, setTags] = useState([]);
  const [relatedNews, serRelatedNews] = useState([]);
  const filteredTags = useMemo(() => tags.filter((tag) => tag.lang === lang), [lang, tags]);
  const filteredRelatedNews = useMemo(
    () => relatedNews.filter((news) => news.lang === lang),
    [lang, relatedNews]
  );

  const dataFetch = handleRequest(async () => {
    const [tags, relatedNews] = await Promise.all([NewsTagsService.getAll(), NewsService.getAll()]);

    if (tags.status !== 200) {
      throw tags;
    }

    if (relatedNews.status !== 200) {
      throw relatedNews;
    }

    serRelatedNews(relatedNews?.data.data);
    setTags(tags?.data.data);
  });

  const handleFinish = async (values) => {
    try {
      const resp = await NewsService.create({
        ...values,
        createdDate: dayjs(new Date()).toISOString()
      });

      if (resp.status !== 200) {
        throw resp;
      }

      message.success("Записи успешно сохранены!");
      navigate("/news");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    form.resetFields(["tags"]);
    form.resetFields(["relatedNews"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const handleRelatedNews = () => {
    form.setFieldsValue({
      relatedNews: form.getFieldValue("relatedNews").slice(0, 3)
    });
  };

  useEffect(() => {
    dataFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card
      title="Создать новость"
      className="card_with-tabs"
      extra={
        <Button type="primary" htmlType="submit" size="large" block onClick={submitter(form)}>
          Создать
        </Button>
      }
    >
      <AntForm {...FORM_LAYOUT} form={form} name="news-create" onFinish={handleFinish}>
        <Tabs defaultActiveKey="main">
          <Tabs.TabPane tab="Основное" key="main" forceRender>
            <Main
              tags={filteredTags}
              handleRelatedNews={handleRelatedNews}
              relatedNews={filteredRelatedNews}
              lang={lang}
            />
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

export default NewsCreate;
