/* eslint-disable react/no-unescaped-entities */
import { DeepPartial, ITranslation } from "@declarations";

export const de: DeepPartial<
  Omit<ITranslation, "navigation" | "cards" | "bin" | "statistics">
> = {
  alt: {
    logo: "Logo"
  },
  ariaLabels: {
    burgerOpen: "Mobilmenü öffnen",
    burgerClose: "Mobilmenü schließen",
    drawerOpen: "Öffne mobiles Menü",
    drawerClose: "Mobilmenü schließen",
    modalClose: "Modales Fenster schließen"
  },
  socials: {
    instagram: {
      value: "Instagram",
      go: "Gehen Sie zu Instagram"
    },
    facebook: {
      value: "Facebook",
      go: "Gehe zu Facebook"
    },
    telegram: {
      value: "Telegram",
      go: "Gehen Sie zu Telegramm"
    },
    whatsapp: {
      value: "WhatsApp",
      go: "Gehen Sie zu WhatsApp"
    }
  },
  validation: {
    required: "Dieses Feld ist erforderlich",
    email: "Falsche Post",
    incorrectPhone: "Falsches Telefon"
  },
  form: {
    labels: {
      name: "Ihr Name",
      email: "E-Mail",
      phone: "Telefonnummer",
      brokerName: "Maklername",
      comment: "Kommentar",
      message: "Nachricht",
      agreeWith: "Ich bin einverstanden mit",
      experiance: "Erfahrung im Börsenhandel",
      shortDescription: "Kurzbeschreibung",
      rating: "dein Zeichen",
      giveAccess: "Ich stimme der Verarbeitung personenbezogener Daten zu"
    },
    placeholder: {
      name: "Gib deinen Namen ein",
      email: "Geben sie ihre E-Mail Adresse ein",
      brokerName: "Makler eingeben",
      message: "Schreib uns",
      experiance: "Zum Beispiel, wie viele Monate/Jahre",
      complaint: "Beschreiben Sie den Kern der Beschwerde",
      shortDescription: "Beschreiben Sie kurz",
      writeComment: "Schreibe einen Kommentar"
    }
  },
  filters: {
    ratingHigh: "Nach Bewertung (hoch zuerst)",
    ratingLow: "Nach Bewertung (niedrigste zuerst)",
    lastAdded: "Zuletzt hinzugefügt",
    popular: "beliebt",
    descending: "Absteigend",
    ascending: "Aufsteigend"
  }
};
