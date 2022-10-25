import { Form as AntForm, Button, Card, Tabs, message } from "antd";
import { useNavigate } from "react-router-dom";

import { OverviewsCategoriesService } from "@services";

import { FORM_LAYOUT } from "@utils/constants";
import { submitter } from "@utils/helpers";

import { Main } from "./components/main";
import { Metadata } from "./components/metadata";

const OverviewsCategoriesCreate = () => {
  // **Props
  const navigate = useNavigate();

  const [form] = AntForm.useForm();

  const handleFinish = async (values) => {
    try {
      values.description = values.description.split("\n").filter((text) => text);

      const resp = await OverviewsCategoriesService.create(values);

      if (resp.status !== 200) {
        throw resp;
      }

      message.success("Записи успешно сохранены!");
      navigate("/overviews-categories");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  return (
    <Card
      title="Создать категорию для обзоров"
      className="card_with-tabs"
      extra={
        <Button type="primary" htmlType="submit" size="large" block onClick={submitter(form)}>
          Создать
        </Button>
      }
    >
      <AntForm
        {...FORM_LAYOUT}
        form={form}
        name="overviews-categories-create"
        onFinish={handleFinish}
      >
        <Tabs defaultActiveKey="main">
          <Tabs.TabPane tab="Основное" key="main" forceRender>
            <Main />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Метаданные" key="metadata" forceRender>
            <Metadata />
          </Tabs.TabPane>
        </Tabs>
      </AntForm>
    </Card>
  );
};

export default OverviewsCategoriesCreate;
