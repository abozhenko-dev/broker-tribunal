/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    defaultLocale: "ru",
    locales: ["ru", "en", "de"]
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["brokerrrr.b-cdn.net"]
  }
};

module.exports = nextConfig;
