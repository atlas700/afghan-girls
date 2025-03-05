import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
  },
  i18n: {
    locales: ["en", "fr", "ps", "fa-AF"], // Supported languages
    defaultLocale: "en", // Default language
    localeDetection: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        hostname: "i.pravatar.cc",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
