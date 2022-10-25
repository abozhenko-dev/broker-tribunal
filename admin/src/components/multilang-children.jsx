import { Segmented } from "antd";

import { LANGUAGES_KEYS } from "@utils/constants";

export const MultilangChildren = ({ value, onChange, children }) => {
  const handleLang = (key) => onChange(key);

  return (
    <>
      <Segmented
        value={value}
        options={LANGUAGES_KEYS}
        onChange={handleLang}
        style={{ marginBottom: 15 }}
        size="large"
      />

      {LANGUAGES_KEYS.map((key) => (
        <div key={key} style={{ display: key !== value ? "none" : "block" }}>
          {children(key)}
        </div>
      ))}
    </>
  );
};
