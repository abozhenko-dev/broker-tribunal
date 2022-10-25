import { Button, Checkbox, Col, Divider, Form, Input, Row, Select, Space } from "antd";
import { AiOutlineDelete } from "react-icons/ai";

import { RemoveBoundary, TextEditor } from "@components";

import { LANGUAGES_OPTIONS, PAGES } from "@utils/constants";

const { Option } = Select;

export const Main = ({ withId }) => (
  <>
    {withId && (
      <Form.Item name="_id" noStyle>
        <Input type="hidden" />
      </Form.Item>
    )}

    <Row gutter={16}>
      <Col span={8}>
        <Form.Item name="lang" label="Язык" rules={[{ required: true }]}>
          <Select placeholder="Выберите язык">
            {LANGUAGES_OPTIONS.map((lang) => (
              <Option key={lang.value} value={lang.value}>
                {lang.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="slug" label="Страница" rules={[{ required: true }]} hasFeedback>
          <Select placeholder="Выберите страницу">
            {PAGES.map((page) => (
              <Option key={page.value} value={page.value}>
                {page.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>

    <Divider />

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="title" label="Заголовок" rules={[{ required: true }]} hasFeedback>
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name="description" label="Описание" rules={[{ required: true }]} hasFeedback>
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name="breadcrumb"
          label="Хлебная крошка"
          extra="Если оставить пустым, будет использовано поле 'Заголовок'"
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

    <Form.Item name="noIndex" valuePropName="checked">
      <Checkbox>Скрыть страницу от поисковиков</Checkbox>
    </Form.Item>

    <Divider />

    <Form.Item
      style={{
        marginTop: "32px"
      }}
      name="seo"
      label="Seo текст"
      wrapperCol={{ span: 24 }}
      hasFeedback
    >
      <TextEditor />
    </Form.Item>
  </>
);
