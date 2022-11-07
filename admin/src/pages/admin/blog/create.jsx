import { useEffect, useMemo, useState } from "react";

import { Form as AntForm, Button, Card, Tabs, message } from "antd";
import { useNavigate } from "react-router-dom";

import { BlogService, BlogTagsService } from "@services";

import { useRequests } from "@hooks";

import { FORM_LAYOUT } from "@utils/constants";
import { submitter } from "@utils/helpers";

import { Images } from "./components/images";
import { Main } from "./components/main";
import { Metadata } from "./components/metadata";

const BlogCreate = () => {
  // **Props
  const navigate = useNavigate();

  const [form] = AntForm.useForm();

  const lang = AntForm.useWatch("lang", form);

  const { handleRequest } = useRequests();

  const [tags, setTags] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const filteredTags = useMemo(() => tags.filter((tag) => tag.lang === lang), [lang, tags]);
  const filteredRelatedArticles = useMemo(
    () => relatedArticles.filter((article) => article.lang === lang),
    [lang, relatedArticles]
  );

  const dataFetch = handleRequest(async () => {
    const [tags, relatedArticles] = await Promise.all([
      BlogTagsService.getAll(),
      BlogService.getAll()
    ]);

    if (tags.status !== 200) {
      throw tags;
    }

    if (relatedArticles.status !== 200) {
      throw relatedArticles;
    }

    setRelatedArticles(relatedArticles?.data.data);
    setTags(tags?.data.data);
  });

  const handleFinish = async (values) => {
    try {
      const resp = await BlogService.create({
        ...values
      });

      if (resp.status !== 200) {
        throw resp;
      }

      message.success("Записи успешно сохранены!");
      navigate("/blog");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    form.resetFields(["tags"]);
    form.resetFields(["relatedArticles"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const handleRelatedArticles = () => {
    form.setFieldsValue({
      relatedArticles: form.getFieldValue("relatedArticles").slice(0, 3)
    });
  };

  useEffect(() => {
    dataFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(filteredTags);

  return (
    <Card
      title="Создать статью"
      className="card_with-tabs"
      extra={
        <Button type="primary" htmlType="submit" size="large" block onClick={submitter(form)}>
          Создать
        </Button>
      }
    >
      <AntForm {...FORM_LAYOUT} form={form} name="blog-create" onFinish={handleFinish}>
        <Tabs defaultActiveKey="main">
          <Tabs.TabPane tab="Основное" key="main" forceRender>
            <Main
              tags={filteredTags}
              handleRelatedArticles={handleRelatedArticles}
              relatedArticles={filteredRelatedArticles}
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

export default BlogCreate;
