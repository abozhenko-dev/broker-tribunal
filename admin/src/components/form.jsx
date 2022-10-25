import { useState } from "react";

import { Form as AntForm, Input, Segmented, Space } from "antd";

import { FORM_LAYOUT, LANGUAGES_KEYS } from "@utils/constants";

export const Form = ({ children, form, name, type, initialValues, onFinish, multilang }) => {
  const [lang, setLang] = useState(LANGUAGES_KEYS[0]);

  const handleLang = (key) => setLang(key);

  const handleFinishFailed = ({ errorFields }) => {
    const errorLang = errorFields?.[0]?.name?.[0];
    if (errorLang) setLang(errorLang);
  };

  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
      {multilang && (
        <Segmented value={lang} options={LANGUAGES_KEYS} onChange={handleLang} size="large" />
      )}

      <AntForm
        {...FORM_LAYOUT}
        form={form}
        name={name}
        labelWrap
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={handleFinishFailed}
      >
        {!multilang ? (
          children
        ) : (
          <>
            {LANGUAGES_KEYS.map((key) => (
              <div key={`${name}-${key}`} style={{ display: key !== lang ? "none" : "block" }}>
                {type === "edit" && (
                  <AntForm.Item name={[key, "id"]} noStyle>
                    <Input type="hidden" />
                  </AntForm.Item>
                )}

                {children(key)}
              </div>
            ))}
          </>
        )}
      </AntForm>
    </Space>
  );
};

Form.useForm = AntForm.useForm;
