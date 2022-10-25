import { Form as AntForm, Button, Card, Tabs, message } from "antd";
import { useNavigate } from "react-router-dom";

import { CategoriesService } from "@services";

import { FORM_LAYOUT } from "@utils/constants";
import { submitter } from "@utils/helpers";

import { Main } from "./components/main";
import { Metadata } from "./components/metadata";

const CategoriesCreate = () => {
  // **Props
  const navigate = useNavigate();

  const [form] = AntForm.useForm();

  const handleFinish = async (values) => {
    try {
      values.description = values.description.split("\n").filter((text) => text);

      const resp = await CategoriesService.create(values);

      if (resp.status !== 200) {
        throw resp;
      }

      message.success("Записи успешно сохранены!");
      navigate("/categories");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  return (
    <Card
      title="Создать рейтинг"
      className="card_with-tabs"
      extra={
        <Button type="primary" htmlType="submit" size="large" block onClick={submitter(form)}>
          Создать
        </Button>
      }
    >
      <AntForm {...FORM_LAYOUT} form={form} name="categories-create" onFinish={handleFinish}>
        <Tabs>
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

export default CategoriesCreate;
