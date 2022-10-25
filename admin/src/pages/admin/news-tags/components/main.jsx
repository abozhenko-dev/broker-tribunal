import { Col, Form, Input, Row, Select } from "antd";

import { LANGUAGES_OPTIONS } from "@utils/constants";

const { Option } = Select;

export const Main = ({ withId }) => (
  <>
    {withId && (
      <Form.Item name="_id" noStyle>
        <Input type="hidden" />
      </Form.Item>
    )}

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="lang" label="Язык" rules={[{ required: true }]}>
          <Select
            style={{
              width: 240
            }}
            placeholder="Выберите язык"
          >
            {LANGUAGES_OPTIONS.map((lang) => (
              <Option key={lang.value} value={lang.value}>
                {lang.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="name" label="Название" rules={[{ required: true }]} hasFeedback>
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name="description" label="Описание" rules={[{ required: true }]} hasFeedback>
          <Input />
        </Form.Item>
      </Col>
    </Row>
  </>
);
