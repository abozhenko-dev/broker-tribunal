import { Form as AntForm, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";

import { MetadataService } from "@services";

import { FORM_LAYOUT } from "@utils/constants";
import { submitter } from "@utils/helpers";

import { Main } from "./components/main";

const MetadataCreate = () => {
  // **Props
  const navigate = useNavigate();

  const [form] = AntForm.useForm();

  const handleFinish = async (values) => {
    try {
      values.faqs = values.faqs
        ?.filter(({ title, content }) => title && content)
        .map((faq) => ({
          title: faq.title,
          content: faq.content?.split("\n")
        }));

      values.seo = values.seo || null;
      values.breadcrumb = values.breadcrumb || null;

      const resp = await MetadataService.create(values);

      if (resp.status !== 200) {
        throw resp;
      }

      message.success("Записи успешно сохранены!");
      navigate("/metadata");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  return (
    <Card
      title="Создать страницу"
      className="card_with-tabs"
      extra={
        <Button type="primary" htmlType="submit" size="large" block onClick={submitter(form)}>
          Создать
        </Button>
      }
    >
      <AntForm {...FORM_LAYOUT} form={form} name="metadata-create" onFinish={handleFinish}>
        <Main />
      </AntForm>
    </Card>
  );
};

export default MetadataCreate;
