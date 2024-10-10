/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'fa'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;