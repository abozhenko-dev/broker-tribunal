import {
  AiOutlineEye,
  AiOutlineFileMarkdown,
  AiOutlineFileText,
  AiOutlineFolderView,
  AiOutlineNumber
} from "react-icons/ai";
import { BiCodeBlock } from "react-icons/bi";
import { BsListStars } from "react-icons/bs";
import { GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import { ImNewspaper } from "react-icons/im";
import { MdOutlineGTranslate, MdOutlineRateReview } from "react-icons/md";
import { RiContactsBookLine } from "react-icons/ri";
import { VscFeedback } from "react-icons/vsc";

const content = [
  {
    type: "group",
    key: "group",
    label: "Компания",
    children: [
      {
        type: "link",
        path: "/brokers",
        key: "brokers",
        label: "Брокеры",
        icon: GiTakeMyMoney
      },
      {
        type: "link",
        path: "/regulators",
        key: "regulators",
        label: "Регуляторы",
        icon: GiReceiveMoney
      },
      {
        type: "link",
        path: "/categories",
        key: "categories",
        label: "Рейтинги",
        icon: BsListStars
      }
    ]
  },
  {
    type: "group",
    key: "group",
    label: "Общее",
    children: [
      {
        type: "link",
        path: "/metadata",
        key: "metadata",
        label: "Страницы",
        icon: AiOutlineFileMarkdown
      },
      {
        type: "link",
        path: "/seo",
        key: "seo",
        label: "Сео",
        icon: BiCodeBlock
      },
      {
        type: "link",
        path: "/translations",
        key: "translations",
        label: "Переводы",
        icon: MdOutlineGTranslate
      }
    ]
  },
  {
    type: "group",
    key: "news",
    label: "Новости",
    children: [
      {
        type: "link",
        path: "/news",
        key: "news-list",
        label: "Список новостей",
        icon: ImNewspaper
      },
      {
        type: "link",
        path: "/news-tags",
        key: "news-tags",
        label: "Теги для новостей",
        icon: AiOutlineNumber
      }
    ]
  },
  {
    type: "group",
    key: "blog",
    label: "Блог",
    children: [
      {
        type: "link",
        path: "/blog",
        key: "blog-list",
        label: "Статьи",
        icon: AiOutlineFileText
      },
      {
        type: "link",
        path: "/blog-tags",
        key: "blog-tags",
        label: "Теги для статей",
        icon: AiOutlineNumber
      }
    ]
  },
  {
    type: "group",
    key: "overviews",
    label: "Обзоры",
    children: [
      {
        type: "link",
        path: "/overviews",
        key: "overviews-list",
        label: "Обзоры",
        icon: AiOutlineEye
      },
      {
        type: "link",
        path: "/overviews-categories",
        key: "overviews-categories",
        label: "Категории обзоров",
        icon: AiOutlineFolderView
      }
    ]
  },
  {
    type: "group",
    key: "contacts",
    label: "Связь",
    children: [
      {
        type: "link",
        path: "/contacts",
        key: "contacts-list",
        label: "Контакты",
        icon: RiContactsBookLine
      }
    ]
  },
  {
    type: "group",
    key: "group",
    label: "Обратная связь",
    children: [
      {
        type: "link",
        path: "/reviews",
        key: "reviews",
        label: "Отзывы",
        icon: MdOutlineRateReview
      },
      {
        type: "link",
        path: "/feedback",
        key: "feedback",
        label: "Формы",
        icon: VscFeedback
      }
    ]
  }
];

export const navigationConfig = [...content];
