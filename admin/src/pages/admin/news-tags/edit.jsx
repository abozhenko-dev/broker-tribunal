import { useEffect } from "react";

import { Form as AntForm, Button, Card, Spin, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { NewsTagsService } from "@services";

import { useRequests } from "@hooks";

import { FORM_LAYOUT } from "@utils/constants";
import { submitter } from "@utils/helpers";

import { Main } from "./components/main";

const NewsTagsEdit = () => {
  // **Props
  const { id } = useParams();
  const navigate = useNavigate();

  const [form] = AntForm.useForm();

  const { handleRequest, isLoading } = useRequests();

  const handleFinish = handleRequest(async (values) => {
    const resp = await NewsTagsService.update(values._id, values);

    if (resp.status !== 200) {
      throw resp;
    }

    message.success("Записи успешно сохранены!");
    navigate("/news-tags");
  });

  const setInitials = handleRequest(async () => {
    const resp = await NewsTagsService.getOne(id);

    if (resp.status !== 200) {
      throw resp;
    }

    form.setFieldsValue(resp.data);
  });

  useEffect(() => {
    setInitials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Spin spinning={isLoading}>
      <Card
        title="Редактировать тег для новости"
        className="card_with-tabs"
        extra={
          <Button type="primary" htmlType="submit" size="large" block onClick={submitter(form)}>
            Редактировать
          </Button>
        }
      >
        <AntForm {...FORM_LAYOUT} form={form} name="news-tags-edit" onFinish={handleFinish}>
          <Main withId />
        </AntForm>
      </Card>
    </Spin>
  );
};

export default NewsTagsEdit;
