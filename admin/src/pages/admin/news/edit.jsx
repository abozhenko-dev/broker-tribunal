import { useEffect, useMemo, useState } from "react";

import { Form as AntForm, Button, Card, Spin, Tabs, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { NewsService, NewsTagsService } from "@services";

import { useRequests } from "@hooks";

import { FORM_LAYOUT } from "@utils/constants";
import { submitter } from "@utils/helpers";

import { Images } from "./components/images";
import { Main } from "./components/main";
import { Metadata } from "./components/metadata";

const NewsEdit = () => {
  // **Props
  const { id } = useParams();
  const navigate = useNavigate();

  const [form] = AntForm.useForm();

  const { handleRequest, isLoading } = useRequests();

  const [tags, setTags] = useState([]);
  const [relatedNews, setRelatedArticles] = useState([]);

  const filteredTags = useMemo(
    () => tags.filter((tag) => tag.lang === form.getFieldValue("lang")),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tags]
  );
  const filteredRelatedNews = useMemo(
    () => relatedNews.filter((news) => news.lang === form.getFieldValue("lang")),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [relatedNews]
  );

  const handleFinish = async (values) => {
    try {
      const resp = await NewsService.update(values._id, values);

      if (resp.status !== 200) {
        throw resp;
      }

      message.success("Записи успешно сохранены!");
      navigate("/news");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const setInitials = handleRequest(async () => {
    const [news, tags, relatedNews] = await Promise.all([
      NewsService.getOne(id),
      NewsTagsService.getAll(),
      NewsService.getAll()
    ]);

    if (news.status !== 200) {
      throw news;
    }

    if (tags.status !== 200) {
      throw tags;
    }

    if (relatedNews.status !== 200) {
      throw relatedNews;
    }

    setRelatedArticles(relatedNews.data.data);
    setTags(tags.data.data);
    form.setFieldsValue({ ...news.data, poster: [news.data.poster] });
  });

  const handleRelatedNews = () => {
    form.setFieldsValue({
      relatedNews: form.getFieldValue("relatedNews").slice(0, 3)
    });
  };

  useEffect(() => {
    setInitials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Spin spinning={isLoading}>
      <Card
        title="Редактировать новость"
        className="card_with-tabs"
        extra={
          <Button type="primary" htmlType="submit" size="large" block onClick={submitter(form)}>
            Редактировать
          </Button>
        }
      >
        <AntForm {...FORM_LAYOUT} form={form} name="news-edit" onFinish={handleFinish}>
          <Tabs defaultActiveKey="main">
            <Tabs.TabPane tab="Основное" key="main" forceRender>
              <Main
                tags={filteredTags}
                handleRelatedNews={handleRelatedNews}
                relatedNews={filteredRelatedNews}
                withId
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
    </Spin>
  );
};

export default NewsEdit;
