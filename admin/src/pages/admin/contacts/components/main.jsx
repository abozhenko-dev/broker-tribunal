import { Col, Form, Input, Row } from "antd";

export const Main = () => (
  <>
    <Form.Item name="_id" noStyle>
      <Input type="hidden" />
    </Form.Item>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="telegram" label="Telegram" rules={[{ required: true }]} hasFeedback>
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name="facebook" label="Facebook" rules={[{ required: true }]} hasFeedback>
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name="instagram" label="Instagram" rules={[{ required: true }]} hasFeedback>
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name="whatsapp" label="WhatsApp" rules={[{ required: true }]} hasFeedback>
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name="email" label="Почта" rules={[{ required: true }]} hasFeedback>
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name="phone" label="Телефон" rules={[{ required: true }]} hasFeedback>
          <Input />
        </Form.Item>
      </Col>
    </Row>
  </>
);
