# Ingá Multimarcas — showroom digital

Site da Ingá Multimarcas: estoque com filtros, página de veículo com galeria, simulação de financiamento, avaliação para venda/troca e contato via WhatsApp.

> ⚠️ **Dados demonstrativos.** Estoque (`data/vehicles.demo.ts`), fotos (placeholders), contatos (`config/site.ts`) e taxa de financiamento (`config/finance.ts`) são DEMO/PLACEHOLDER e estão marcados no código.

## Comandos
```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run lint
npm run typecheck    # next typegen + tsc
npm test             # Vitest (filtros, URL, facetas, formatação, WhatsApp, financiamento, semelhantes)
npm run test:e2e     # Playwright (requer `npm run build`), desktop 1440 e mobile 390
node scripts/generate-demo-images.mjs   # regera os placeholders
```

## Documentação
- [docs/01-analise-referencias.md](docs/01-analise-referencias.md): análise das referências (Honda Freeway, Castro Car, Garcia)
- [docs/02-arquitetura.md](docs/02-arquitetura.md): estrutura, camada de dados, migração para MongoDB, admin
- [docs/03-direcao-visual.md](docs/03-direcao-visual.md): direção visual **provisória** (aguardando logo)
