import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Não gerar AGENTS.md/CLAUDE.md automaticamente no `next dev`.
  agentRules: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Quando as fotos reais vierem de um CDN/storage, registre o host aqui.
    remotePatterns: [],
  },
};

export default nextConfig;
