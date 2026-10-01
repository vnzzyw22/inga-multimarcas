import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Quando as fotos reais vierem de um CDN/storage, registre o host aqui.
    remotePatterns: [],
  },
};

export default nextConfig;
