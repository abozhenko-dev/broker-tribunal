import { Form as AntForm, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";

import { NewsTagsService } from "@services";

import { useRequests } from "@hooks";

import { FORM_LAYOUT } from "@utils/constants";
import { submitter } from "@utils/helpers";

import { Main } from "./components/main";

const NewsTagsCreate = () => {
  // **Props
  const navigate = useNavigate();

  const [form] = AntForm.useForm();

  const { handleRequest } = useRequests();

  const handleFinish = handleRequest(async (values) => {
    const resp = await NewsTagsService.create(values);

    if (resp.status !== 200) {
      throw resp;
    }

    message.success("Записи успешно сохранены!");
    navigate("/news-tags");
  });

  return (
    <Card
      title="Создать тег для новостей"
      className="card_with-tabs"
      extra={
        <Button type="primary" htmlType="submit" size="large" block onClick={submitter(form)}>
          Создать
        </Button>
      }
    >
      <AntForm {...FORM_LAYOUT} form={form} name="news-tags-create" onFinish={handleFinish}>
        <Main />
      </AntForm>
    </Card>
  );
};

export default NewsTagsCreate;
