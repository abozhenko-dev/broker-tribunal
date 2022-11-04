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
    domains: ["broker-tribunal.b-cdn.net"]
  },
  redirects: async () => [
    {
      source: "/:path*",
      has: [{ type: "host", value: "www.getrefund.co.uk" }],
      destination: "https://getrefund.co.uk/:path*",
      permanent: true,
      locale: false
    },
    {
      source: "/:locale/sitemap.xml",
      destination: "https://getrefund.co.uk/sitemap.xml",
      permanent: true
    }
  ],
};

module.exports = nextConfig;
