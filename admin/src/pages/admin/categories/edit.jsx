import { useEffect } from "react";

import { Form as AntForm, Button, Card, Spin, Tabs, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { Form } from "@components";

import { CategoriesService } from "@services";

import { useRequests } from "@hooks";

import { submitter } from "@utils/helpers";

import { Main } from "./components/main";
import { Metadata } from "./components/metadata";

const CategoriesEdit = () => {
  // **Props
  const { id } = useParams();
  const navigate = useNavigate();

  const [form] = AntForm.useForm();

  const { handleRequest, isLoading } = useRequests();

  const handleFinish = async (values) => {
    try {
      values.description = values.description.split("\n").filter((text) => text);

      const resp = await CategoriesService.update(values._id, values);

      if (resp.status !== 200) {
        throw resp;
      }

      message.success("Записи успешно сохранены!");
      navigate("/categories");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const setInitials = handleRequest(async () => {
    const resp = await CategoriesService.getOne(id);

    if (resp.status !== 200) {
      throw resp;
    }

    resp.data.description = resp.data.description.join("\n");

    form.setFieldsValue(resp.data);
  });

  useEffect(() => {
    setInitials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Spin spinning={isLoading}>
      <Card
        title="Редактирование рейтинга"
        extra={
          <Button type="primary" htmlType="submit" size="large" block onClick={submitter(form)}>
            Редактировать
          </Button>
        }
      >
        <Form form={form} name="categories-edit" onFinish={handleFinish}>
          <Tabs defaultActiveKey="main">
            <Tabs.TabPane tab="Основное" key="main" forceRender>
              <Main withId />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Метаданные" key="metadata" forceRender>
              <Metadata />
            </Tabs.TabPane>
          </Tabs>
        </Form>
      </Card>
    </Spin>
  );
};

export default CategoriesEdit;
