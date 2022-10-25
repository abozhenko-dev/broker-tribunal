import { message } from "antd";

import { LANGUAGES_KEYS } from "@utils/constants";

export const multilangInitial = ({ multilang, other }) => {
  const multilangValues = LANGUAGES_KEYS.reduce(
    (acc, lang) => ({ ...acc, [lang]: multilang(lang) }),
    {}
  );

  return { ...multilangValues, other };
};

export const multilangData = (values) => {
  const { other, ...rest } = values;

  if (!other) return rest;

  return Object.fromEntries(
    Object.entries(rest).map(([key, vals]) => [key, { ...vals, ...other }])
  );
};

export const imageData = (name, value) => {
  const formData = new FormData();
  const preloaded = [];
  let updated = false;

  if (!Array.isArray(value)) {
    if (value?.isPreloaded && value?.id) preloaded.push(value?.id);
    else {
      formData.append(name, value.originFileObj);
      updated = true;
    }
  } else {
    value.forEach((item) => {
      if (item?.isPreloaded && item?.id) preloaded.push(item?.id);
      else {
        formData.append(name, item.originFileObj);
        updated = true;
      }
    });
  }

  return { preloaded, new: formData, updated };
};

export const submitter = (form) => () => form.submit();

export const finishFailedHandler = ({ errorFields }) => {
  const errorLang = errorFields?.[0]?.name?.[0];
  if (errorLang) message.error("Заполните обязательные поля!");

  // const errorLang = errorFields?.[0]?.name?.[0];
  // if (errorLang) setLang(errorLang);
};
