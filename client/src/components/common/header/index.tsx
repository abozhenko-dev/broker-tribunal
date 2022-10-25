import { ChangeEvent, FC, useEffect, useState } from "react";

import Link from "next/link";

import useSWR from "swr";

import { Container, Logo, Typography } from "@components/ui";

import { useTranslation } from "@hooks";

import {
  ICategory,
  ICompany,
  IContacts,
  IOverviewCategory
} from "@declarations";

import { Drawer } from "../drawer";
import { Search } from "../search";
import { Socials } from "../socials";

import { Accordion } from "./accordion";
import { Languages } from "./languages";

interface HeaderProps {
  overviews: IOverviewCategory[];
  categories: ICategory[];
  contacts: IContacts;
}

export const Header: FC<HeaderProps> = (props) => {
  // **Props
  const { overviews, categories, contacts } = props;
  const t = useTranslation();

  // **Local state
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // **SWR
  const { data } = useSWR<ICompany[]>(
    search ? `/search?filter=${search}` : null,
    {
      dedupingInterval: 0,
      shouldRetryOnError: false,
      errorRetryCount: 0
    }
  );

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isSearchOpen && search.length !== 0) {
      setIsSearchOpen(true);
    }

    if (isSearchOpen && search.length === 0) {
      setIsSearchOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <>
      <Drawer visible={isOpen} onClose={handleClose} className="header-menu">
        <Search
          visible={isSearchOpen}
          withDropdown
          value={search}
          items={data}
          onInput={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          placeholder={t.bin.search as string}
          onClose={() => setIsSearchOpen(false)}
        />
        <nav className="header-nav">
          <ul className="header-nav__list">
            <Accordion title={t.bin.rating as string}>
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link href={`/rating/${category.slug}`}>
                    <a>{category.name}</a>
                  </Link>
                </li>
              ))}
            </Accordion>
            {overviews.length && (
              <Accordion title={t.bin.reviews as string}>
                {overviews.map((overview) => (
                  <li key={overview._id}>
                    <Link href={`/overview/${overview.slug}`}>
                      <a>{overview.name}</a>
                    </Link>
                  </li>
                ))}
              </Accordion>
            )}
            <li className="header-nav__item">
              <Link href="/regulators">
                <a>{t.navigation.regulators}</a>
              </Link>
            </li>
            <li className="header-nav__item">
              <Link href="/catalog">
                <a>{t.navigation.catalog}</a>
              </Link>
            </li>
            <li className="header-nav__item">
              <Link href="/news">
                <a>{t.navigation.news}</a>
              </Link>
            </li>
            <li className="header-nav__item">
              <Link href="/blog">
                <a>{t.navigation.blog}</a>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-menu__info">
          <Socials contacts={contacts} />
          <Typography variant="caption" color="grey">
            {t.bin.schedule}: 09.00 - 19.00
          </Typography>
          <ul className="header-menu__contacts">
            <li className="email">
              <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
            </li>
            <li className="phone">
              <a href={`tel:${contacts.phone?.replace(/[()_-\s]/g, "")}`}>
                {contacts.phone}
              </a>
            </li>
          </ul>
        </div>
      </Drawer>
      <header className="header">
        <Container>
          <div className="header-wrapper">
            <Logo />
            <ul className="header-contacts">
              <li>
                <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
              </li>
              <li>
                <a href={`tel:${contacts.phone?.replace(/[()_-\s]/g, "")}`}>
                  {contacts.phone}
                </a>
              </li>
            </ul>
            <Socials contacts={contacts} />
            <Languages />
            <button
              className={isOpen ? "header-burger open" : "header-burger"}
              onClick={handleOpen}
              aria-label={
                isOpen ? t.ariaLabels.burgerClose : t.ariaLabels.burgerOpen
              }
            >
              <span></span>
            </button>
          </div>
        </Container>
      </header>
    </>
  );
};
