import { Checkbox, Col, Divider, Form, Input, Row, Select } from "antd";

import { LANGUAGES_OPTIONS } from "@utils/constants";

const { TextArea } = Input;
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
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="slug"
          label="Чпу (урл)"
          rules={[
            { required: true },
            {
              required: true,
              pattern: new RegExp("^[a-z0-9]+(?:-[a-z0-9]+)*$"),
              message: "Некорректные символы!"
            }
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="name" label="Заголовок" rules={[{ required: true }]} hasFeedback>
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="description" label="Описание" rules={[{ required: true }]} hasFeedback>
          <TextArea autoSize />
        </Form.Item>
      </Col>
    </Row>

    <Form.Item name="showOnHome" valuePropName="checked">
      <Checkbox>Показывать на главном экране</Checkbox>
    </Form.Item>

    <Divider />
  </>
);
