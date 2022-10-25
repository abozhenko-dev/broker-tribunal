import { Button, Checkbox, Col, Divider, Form, Input, Row, Space } from "antd";
import { AiOutlineDelete } from "react-icons/ai";

import { RemoveBoundary } from "@components";

export const Metadata = () => (
  <>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name={["meta", "title"]}
          label="Заголовок страницы"
          extra="Если оставить пустым, будет использовано поле 'Заголовок' из вкладки 'Основное'"
          hasFeedback
        >
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name={["meta", "description"]} label="Описание страницы" hasFeedback>
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name={["meta", "breadcrumb"]}
          label="Хлебная крошка"
          extra="Если оставить пустым, будет использовано поле 'Заголовок страницы'"
          hasFeedback
        >
          <Input />
        </Form.Item>
      </Col>
    </Row>

    <Divider />

    <Form.List name="faqs">
      {(fields, { add, remove }) => (
        <Space direction="vertical" size={0} style={{ display: "flex" }}>
          {fields.map((field) => (
            <Row key={field.key} gutter={16}>
              <Col span={5}>
                <Form.Item {...field} label="Вопрос" name={[field.name, "title"]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item {...field} label="Ответ" name={[field.name, "content"]}>
                  <Input.TextArea autoSize />
                </Form.Item>
              </Col>

              <Col span={1}>
                <RemoveBoundary handler={() => remove(field.name)} isApiHandler={false}>
                  <Button
                    danger
                    icon={<AiOutlineDelete />}
                    size="large"
                    title="Убрать Faq"
                    style={{ marginTop: "48px" }}
                  />
                </RemoveBoundary>
              </Col>
            </Row>
          ))}

          <Button type="primary" onClick={() => add()}>
            Добавить Faq
          </Button>
        </Space>
      )}
    </Form.List>

    <Divider />

    <Form.Item name={["meta", "noIndex"]} valuePropName="checked">
      <Checkbox>Скрыть страницу от поисковиков</Checkbox>
    </Form.Item>
  </>
);
