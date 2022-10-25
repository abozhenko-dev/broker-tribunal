/* eslint-disable @next/next/no-img-element */
import { FC } from "react";

import { Icon } from "@components/ui";

import { useTranslation } from "@hooks";

import { IContacts, IIcons } from "@declarations";

interface SocialsProps {
  contacts: IContacts;
}

export const Socials: FC<SocialsProps> = (props) => {
  // **Props
  const { contacts } = props;
  const t = useTranslation();

  return (
    <ul className="socials">
      {contacts &&
        Object.entries(contacts)
          .filter(([key]) =>
            ["instagram", "telegram", "whatsapp", "facebook"].includes(key)
          )
          .map(([key, value]) => (
            <li key={key}>
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                aria-label={t.socials[key].go}
              >
                <Icon icon={key as keyof IIcons} />
              </a>
            </li>
          ))}
    </ul>
  );
};
