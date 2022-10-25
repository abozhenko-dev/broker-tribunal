import { Checkbox, Col, Form, Input, InputNumber, Row, Select } from "antd";

import { TextEditor } from "@components";

import { LANGUAGES_OPTIONS } from "@utils/constants";

const { Option } = Select;

export const Main = ({ withId, categories, lang }) => (
  <>
    {withId && (
      <>
        <Form.Item name="_id" noStyle>
          <Input type="hidden" />
        </Form.Item>

        <Form.Item name="lang" noStyle>
          <Input type="hidden" />
        </Form.Item>
      </>
    )}

    <Row gutter={16}>
      {!withId && (
        <Col span={12}>
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
      )}
      <Col span={12}>
        <Form.Item name="categories" label="Категории" rules={[{ required: true }]}>
          <Select
            mode="multiple"
            allowClear
            placeholder="Выберите категории"
            disabled={!withId && !lang}
          >
            {categories.map((category) => (
              <Option key={category._id} value={category._id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="name" label="Имя" rules={[{ required: true }]} hasFeedback>
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name="slug"
          label="ЧПУ(url)"
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
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="jurisdiction" label="Юрисдикция" rules={[{ required: true }]} hasFeedback>
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name="minDeposit" label="Мин. депозит" rules={[{ required: true }]} hasFeedback>
          <InputNumber
            style={{
              width: "100%"
            }}
            size="small"
            min={0}
          />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name={["info", "website"]} label="Сайт" hasFeedback>
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name={["info", "phone"]} label="Телефон" allowClear hasFeedback>
          <Input />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name={["info", "country"]} label="Страна" hasFeedback>
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name={["info", "email"]} label="Почта" hasFeedback>
          <Input />
        </Form.Item>
      </Col>
    </Row>

    <Row>
      <Col span={12}>
        <Form.Item name="isInCatalog" valuePropName="checked">
          <Checkbox>Показывать в каталоге</Checkbox>
        </Form.Item>
      </Col>
    </Row>

    <Form.Item
      style={{
        marginTop: "32px"
      }}
      name="about"
      label="О брокере"
      wrapperCol={{ span: 24 }}
      hasFeedback
      rules={[{ required: true }]}
    >
      <TextEditor />
    </Form.Item>
  </>
);
