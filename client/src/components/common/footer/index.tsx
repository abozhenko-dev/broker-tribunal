import { FC } from "react";

import Link from "next/link";

import { Button, Container, Typography } from "@components/ui";

import { useTranslation } from "@hooks";

import { ICategory, IContacts, IOverviewCategory } from "@declarations";

import { OTHERS } from "@constants";

import { Socials } from "../socials";

interface FooterProps {
  overviews: IOverviewCategory[];
  categories: ICategory[];
  contacts: IContacts;
}

export const Footer: FC<FooterProps> = (props) => {
  // **Props
  const { overviews, categories, contacts } = props;
  const t = useTranslation();

  return (
    <footer className="footer">
      <Container>
        <div className="footer-about">
          <Typography tag="h3" variant="h3">
            {t.bin.aboutUs}
          </Typography>
          <Typography
            variant="paragraph2"
            color="grey"
            className="footer-about__info"
          >
            <p>
              Проект БрокерТрибунал появился в интернете летом в 2018 году и
              представляет собой площадку для размещения отзывов и мнений
              трейдеров о форекс брокерах. Цель проекта - пролить свет на
              деятельность инвестиционных компаний, которые не выполняют взятые
              на себя обязательства перед своими клиентами, вводя их в
              заблуждения.
            </p>
            <p>
              Писать статьи и оставлять отзывы может каждый Пользователь,
              достигнувший 18 летнего возраста.
            </p>
            <p>
              БрокерТрибунал не отвечает за информацию и предложения,
              размещаемые Пользователями на Сайте
            </p>
          </Typography>
        </div>
        <div className="footer-content">
          <div className="footer-content__info">
            <div className="footer-content__column">
              <div className="footer-content__item">
                <Typography
                  className="footer-content__title"
                  variant="caption"
                  color="grey"
                >
                  {t.bin.rating}
                </Typography>
                <ul className="footer-content__list">
                  {categories.map((category) => (
                    <li key={category.slug}>
                      <Link href={`/rating/${category.slug}`}>
                        <a>{category.name}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="footer-content__column">
              {overviews.length && (
                <div className="footer-content__item">
                  <Typography
                    className="footer-content__title"
                    variant="caption"
                    color="grey"
                  >
                    {t.bin.reviews}
                  </Typography>
                  <ul className="footer-content__list">
                    {overviews.map((overview) => (
                      <li key={overview._id}>
                        <Link href={`/overview/${overview.slug}`}>
                          <a>{overview.name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="footer-content__item">
                <Typography
                  className="footer-content__title"
                  variant="caption"
                  color="grey"
                >
                  {t.bin.otherPages}
                </Typography>
                <ul className="footer-content__list">
                  {Object.entries(OTHERS).map(([key, route]) => (
                    <li key={key}>
                      <Link href={route}>
                        <a>{t.navigation[key]}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-content__data">
            <Socials contacts={contacts} />
            <div className="footer-content__socials">
              <a
                href={`mailto:${contacts.email}`}
                className="footer-content__email"
              >
                {contacts.email}
              </a>
              <a
                href={`tel:${contacts.phone?.replace(/[()_-\s]/g, "")}`}
                className="footer-content__phone"
              >
                {contacts.phone}
              </a>
            </div>
            <Button>{t.bin.orderCall}</Button>
            <Typography
              className="footer-content__stamp"
              variant="paragraph2"
              color="grey"
            >
              {t.bin.stamp}
            </Typography>
          </div>
        </div>
      </Container>
    </footer>
  );
};
