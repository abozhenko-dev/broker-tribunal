/* eslint-disable react/no-unescaped-entities */
import { DeepPartial, ITranslation } from "@declarations";

export const ru: DeepPartial<
  Omit<ITranslation, "navigation" | "cards" | "bin" | "statistics">
> = {
  alt: {
    logo: "Логотип"
  },
  ariaLabels: {
    burgerOpen: "Открыть мобильное меню",
    burgerClose: "Закрыть мобильное меню",
    drawerOpen: "Открыть мобильное меню",
    drawerClose: "Закрыть мобильное меню",
    modalClose: "Закрыть модальное окно"
  },
  socials: {
    instagram: {
      value: "Инстаграм",
      go: "Перейти в Инстаграм"
    },
    facebook: {
      value: "Facebook",
      go: "Перейти в Facebook"
    },
    telegram: {
      value: "Телеграм",
      go: "Перейти в Телеграм"
    },
    whatsapp: {
      value: "Вотсап",
      go: "Перейти в Вотсап"
    }
  },
  validation: {
    required: "Поле обязательно",
    email: "Некорректная почта",
    incorrectPhone: "Некорректный телефон"
  },
  filters: {
    ratingHigh: "По рейтингу (сначала высокие)",
    ratingLow: "По рейтингу (сначала низкие)",
    lastAdded: "Последние добавленные",
    popular: "Популярные",
    descending: "По убыванию",
    ascending: "По возрастанию"
  },
  form: {
    labels: {
      name: "Ваше имя",
      email: "Электронны адрес",
      phone: "Номер телефона",
      brokerName: "Название брокера",
      comment: "Комментарий",
      message: "Сообщение",
      agreeWith: "Я согласен с",
      experiance: "Опыт торговли на бирже",
      shortDescription: "Краткое описание",
      rating: "Ваша оценка",
      giveAccess: "Я даю согласие на обработку персональных данных"
    },
    placeholder: {
      name: "Введите ваше имя",
      email: "Введите вашу почту",
      brokerName: "Введите брокера",
      message: "Напишите нам",
      experiance: "К примеру сколько Месяц/Лет",
      complaint: "Опишите суть жалобы",
      shortDescription: "Опишите кратко",
      writeComment: "Напишите комментарий"
    }
  }
};
