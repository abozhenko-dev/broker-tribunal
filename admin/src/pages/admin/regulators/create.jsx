import { Form as AntForm, Button, Card, Tabs, message } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import { RegulatorsService } from "@services";

import { FORM_LAYOUT } from "@utils/constants";
import { submitter } from "@utils/helpers";

import { Images } from "./components/images";
import { Main } from "./components/main";
import { Metadata } from "./components/metadata";

const RegulatorsCreate = () => {
  // **Props
  const navigate = useNavigate();

  const [form] = AntForm.useForm();

  const handleFinish = async (values) => {
    try {
      values.faqs = values.faqs
        ?.filter(({ title, content }) => title && content)
        .map((faq) => ({
          title: faq.title,
          content: faq.content?.split(/[\n\\]/)?.filter((value) => value)
        }));

      const resp = await RegulatorsService.create({
        ...values,
        foundingDate: dayjs(new Date()).toISOString()
      });

      if (resp.status !== 200) {
        throw resp;
      }

      message.success("Записи успешно сохранены!");
      navigate("/regulators");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  return (
    <Card
      title="Создать регулятора"
      className="card_with-tabs"
      extra={
        <Button type="primary" htmlType="submit" size="large" block onClick={submitter(form)}>
          Создать
        </Button>
      }
    >
      <AntForm {...FORM_LAYOUT} form={form} name="regulators-create" onFinish={handleFinish}>
        <Tabs defaultActiveKey="main">
          <Tabs.TabPane tab="Основное" key="main" forceRender>
            <Main />
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

export default RegulatorsCreate;
