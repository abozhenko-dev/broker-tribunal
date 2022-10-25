import { Col, Form, Input, Row } from "antd";

export const Main = () => (
  <>
    <Form.Item name="_id" noStyle>
      <Input type="hidden" />
    </Form.Item>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="robots" label="Robots.txt" rules={[{ required: true }]} hasFeedback>
          <Input.TextArea rows={6} autoSize />
        </Form.Item>
      </Col>
    </Row>
  </>
);
