import { Col, Form, Input, Row, Select } from "antd";

import { TextEditor } from "@components";

import { LANGUAGES_OPTIONS } from "@utils/constants";

const { Option } = Select;

export const Main = ({ withId, tags, lang, relatedArticles, handleRelatedArticles }) => (
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
        <Form.Item name="tags" label="Теги" rules={[{ required: true }]}>
          <Select
            mode="multiple"
            allowClear
            placeholder="Выберите теги"
            disabled={!withId && !lang}
          >
            {tags.map((tag) => (
              <Option key={tag._id} value={tag.name}>
                {tag.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item name="title" label="Заголовок" rules={[{ required: true }]} hasFeedback>
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="relatedArticles" label="Похожие статьи">
          <Select
            mode="multiple"
            allowClear
            placeholder="Выберите похожие статьи"
            disabled={!withId && !lang}
            onSelect={handleRelatedArticles}
          >
            {relatedArticles.map((article) => (
              <Option key={article._id} value={article._id}>
                {article.title}
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
      <Col span={12}>
        <Form.Item name="shortDescription" label="Короткое описание" hasFeedback>
          <Input />
        </Form.Item>
      </Col>
    </Row>

    <Form.Item
      style={{
        marginTop: "32px"
      }}
      name="content"
      label="Содержимое"
      wrapperCol={{ span: 24 }}
      hasFeedback
      rules={[{ required: true }]}
    >
      <TextEditor />
    </Form.Item>
  </>
);
