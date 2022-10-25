import { Checkbox, Col, Divider, Form, Input, Row } from "antd";

import { TextEditor } from "@components";

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

    <Form.Item name={["meta", "noIndex"]} valuePropName="checked">
      <Checkbox>Скрыть страницу от поисковиков</Checkbox>
    </Form.Item>

    <Divider />

    <Form.Item
      style={{
        marginTop: "32px"
      }}
      name={["meta", "seo"]}
      label="Сео текст"
      wrapperCol={{ span: 24 }}
      hasFeedback
    >
      <TextEditor />
    </Form.Item>
  </>
);
