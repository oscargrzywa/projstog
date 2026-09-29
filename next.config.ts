import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Własna strona 404 dla adresów spoza tras — root layout jest pod
    // dynamicznym `[lang]`, więc zwykły not-found.tsx ich nie łapie.
    // Plik: app/global-not-found.tsx.
    globalNotFound: true,
  },
};

export default nextConfig;
