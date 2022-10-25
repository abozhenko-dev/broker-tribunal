import { useEffect, useMemo, useState } from "react";

import { Form as AntForm, Button, Card, Spin, Tabs, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { BlogService, BlogTagsService } from "@services";

import { useRequests } from "@hooks";

import { FORM_LAYOUT } from "@utils/constants";
import { submitter } from "@utils/helpers";

import { Images } from "./components/images";
import { Main } from "./components/main";
import { Metadata } from "./components/metadata";

const BlogEdit = () => {
  // **Props
  const { id } = useParams();
  const navigate = useNavigate();

  const [form] = AntForm.useForm();

  const { handleRequest, isLoading } = useRequests();

  const [tags, setTags] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]);

  const filteredTags = useMemo(
    () => tags.filter((tag) => tag.lang === form.getFieldValue("lang")),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tags]
  );
  const filteredRelatedArticles = useMemo(
    () => relatedArticles.filter((article) => article.lang === form.getFieldValue("lang")),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [relatedArticles]
  );

  const handleFinish = async (values) => {
    try {
      const resp = await BlogService.update(values._id, values);

      if (resp.status !== 200) {
        throw resp;
      }

      message.success("Записи успешно сохранены!");
      navigate("/blog");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const setInitials = handleRequest(async () => {
    const [blog, tags, relatedArticles] = await Promise.all([
      BlogService.getOne(id),
      BlogTagsService.getAll(),
      BlogService.getAll()
    ]);

    if (blog.status !== 200) {
      throw blog;
    }

    if (tags.status !== 200) {
      throw tags;
    }

    if (relatedArticles.status !== 200) {
      throw relatedArticles;
    }

    setRelatedArticles(relatedArticles.data.data);
    setTags(tags.data.data);
    form.setFieldsValue({ ...blog.data, poster: [blog.data.poster] });
  });

  const handleRelatedArticles = () => {
    form.setFieldsValue({
      relatedArticles: form.getFieldValue("relatedArticles").slice(0, 3)
    });
  };

  useEffect(() => {
    setInitials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Spin spinning={isLoading}>
      <Card
        title="Редактировать статью"
        className="card_with-tabs"
        extra={
          <Button type="primary" htmlType="submit" size="large" block onClick={submitter(form)}>
            Редактировать
          </Button>
        }
      >
        <AntForm {...FORM_LAYOUT} form={form} name="blog-edit" onFinish={handleFinish}>
          <Tabs defaultActiveKey="main">
            <Tabs.TabPane tab="Основное" key="main" forceRender>
              <Main
                tags={filteredTags}
                handleRelatedArticles={handleRelatedArticles}
                relatedArticles={filteredRelatedArticles}
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

export default BlogEdit;
