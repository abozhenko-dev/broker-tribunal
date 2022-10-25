/* eslint-disable react/no-unescaped-entities */
import { DeepPartial, ITranslation } from "@declarations";

export const en: DeepPartial<
  Omit<ITranslation, "navigation" | "cards" | "bin" | "statistics">
> = {
  alt: {
    logo: "logo"
  },
  ariaLabels: {
    burgerOpen: "Open mobile menu",
    burgerClose: "Close mobile menu",
    drawerOpen: "Open mobile menu",
    drawerClose: "Close mobile menu",
    modalClose: "Close modal window"
  },
  socials: {
    instagram: {
      value: "Instagram",
      go: "Go to Instagram"
    },
    facebook: {
      value: "facebook",
      go: "Go to Facebook"
    },
    telegram: {
      value: "Telegram",
      go: "Go to Telegram"
    },
    whatsapp: {
      value: "Watsup",
      go: "Go to WhatsApp"
    }
  },
  validation: {
    required: "Field is required",
    email: "Invalid email",
    incorrectPhone: "Invalid phone"
  },
  form: {
    labels: {
      name: "Your name",
      email: "Email address",
      phone: "Phone number",
      brokerName: "Name of the broker",
      comment: "Comment",
      message: "message",
      agreeWith: "I agree with",
      experiance: "Exchange trading experience",
      shortDescription: "Short description",
      rating: "Your rating",
      giveAccess: "I consent to the processing of personal data"
    },
    placeholder: {
      name: "Enter your name",
      email: "Enter your email",
      brokerName: "Enter broker",
      message: "Message us",
      experiance: "For example how many Month/Years",
      complaint: "Describe the nature of the complaint",
      shortDescription: "Describe briefly",
      writeComment: "Write a comment"
    }
  },
  filters: {
    ratingHigh: "By rating (high first)",
    ratingLow: "By rating (lowest first)",
    lastAdded: "Last added",
    popular: "Popular",
    descending: "Descending",
    ascending: "Ascending"
  }
};
