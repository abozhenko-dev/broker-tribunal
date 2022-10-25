import { useEffect } from "react";

import { Form as AntForm, Button, Card, Spin, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { Form } from "@components";

import { MetadataService } from "@services";

import { useRequests } from "@hooks";

import { submitter } from "@utils/helpers";

import { Main } from "./components/main";

const MetadataEdit = () => {
  // **Props
  const { id } = useParams();
  const navigate = useNavigate();

  // **Local state
  const [form] = AntForm.useForm();

  const { handleRequest, isLoading } = useRequests();

  const handleFinish = async (values) => {
    try {
      values.faqs = values.faqs
        ?.filter(({ title, content }) => title && content)
        .map((faq) => ({
          title: faq.title,
          content: faq.content?.split(/[\n\\]/)?.filter((value) => value)
        }));

      values.seo = values.seo || null;
      values.breadcrumb = values.breadcrumb || null;

      const resp = await MetadataService.update(values._id, values);

      if (resp.status !== 200) {
        throw resp;
      }

      message.success("Записи успешно сохранены!");
      navigate("/metadata");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const setInitials = handleRequest(async () => {
    const resp = await MetadataService.getOne(id);

    if (resp.status !== 200) {
      throw resp;
    }

    form.setFieldsValue({
      ...resp.data,
      faqs: resp.data.faqs.map((faq) => ({ title: faq.title, content: faq.content.join("\n") }))
    });
  });

  useEffect(() => {
    setInitials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Spin spinning={isLoading}>
      <Card
        title="Редактирование страницы"
        extra={
          <Button type="primary" htmlType="submit" size="large" block onClick={submitter(form)}>
            Редактировать
          </Button>
        }
      >
        <Form form={form} name="metadata-edit" onFinish={handleFinish}>
          <Main withId />
        </Form>
      </Card>
    </Spin>
  );
};

export default MetadataEdit;
