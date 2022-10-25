import { useEffect, useMemo, useState } from "react";

import { Form as AntForm, Button, Card, Spin, Tabs, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { OverviewsCategoriesService, OverviewsService } from "@services";

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

  const [categories, setCategories] = useState([]);

  const filteredCategories = useMemo(
    () => categories.filter((category) => category.lang === form.getFieldValue("lang")),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categories]
  );

  const handleFinish = async (values) => {
    try {
      const resp = await OverviewsService.update(values._id, values);

      if (resp.status !== 200) {
        throw resp;
      }

      message.success("Записи успешно сохранены!");
      navigate("/overviews");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const setInitials = handleRequest(async () => {
    const [overview, categories] = await Promise.all([
      OverviewsService.getOne(id),
      OverviewsCategoriesService.getAll()
    ]);

    if (overview.status !== 200) {
      throw overview;
    }

    setCategories(categories.data.data);
    form.setFieldsValue({ ...overview.data, logo: [overview.data.logo] });
  });

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
        <AntForm {...FORM_LAYOUT} form={form} name="overviews-edit" onFinish={handleFinish}>
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
        </AntForm>
      </Card>
    </Spin>
  );
};

export default BlogEdit;
