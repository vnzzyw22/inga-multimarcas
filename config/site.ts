/**
 * Configuração única da empresa.
 *
 * ⚠️ PLACEHOLDER: nenhum dado de contato abaixo é real. Substitua pelos dados
 * oficiais da Ingá Multimarcas antes de publicar. Enquanto `isPlaceholder` for
 * true, a interface sinaliza que o contato é demonstrativo.
 */
export const siteConfig = {
  name: "Ingá Multimarcas",
  shortName: "Ingá",
  /** URL pública de produção (usada em canonical, sitemap e Open Graph). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "pt_BR",
  description:
    "Estoque de veículos novos e seminovos da Ingá Multimarcas. Veja fotos, ficha técnica e fale direto com a loja pelo WhatsApp.",

  contact: {
    isPlaceholder: true,
    /** Somente dígitos, com DDI e DDD. PLACEHOLDER. */
    whatsapp: "5500000000000",
    whatsappDisplay: "(00) 00000-0000",
    phone: "550000000000",
    phoneDisplay: "(00) 0000-0000",
    email: "contato@exemplo.com.br",
    instagram: { handle: "@ingamultimarcas", url: "https://www.instagram.com/" },
    address: {
      street: "Endereço a definir",
      district: "",
      city: "Cidade",
      state: "UF",
      zip: "",
      mapsUrl: "",
    },
    hours: [
      { days: "Segunda a sexta", time: "Horário a definir" },
      { days: "Sábado", time: "Horário a definir" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
