// Layouts
export const FORM_LAYOUT = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  },
  size: "large"
};

// Rules
export const EMAIL_RULES = [
  {
    required: true,
    message: "Email обязательное поле!"
  },
  {
    type: "email",
    message: "Некорректный email!"
  }
];

export const PASSWORD_RULES = [
  {
    required: true,
    message: "Пароль обязательное поле!"
  }
];
