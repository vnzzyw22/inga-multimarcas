# Contexto para continuar o projeto (handoff)

Você está assumindo o site da **Ingá Multimarcas**, uma revenda de veículos. O objetivo é um *showroom digital automotivo premium*: os carros são os protagonistas, a navegação é rápida e tudo leva à conversão via WhatsApp. **Não** pode parecer template de concessionária nem site "feito por IA".

## Onde estamos
- Stack: Next.js 16 (App Router) + React 19 + TypeScript estrito + Tailwind CSS 4 + Framer Motion. Sem banco e sem backend por enquanto.
- Branch de trabalho: `claude/lucid-keller-xib6uy` (já publicada na Vercel pelo cliente).
- Leia antes de mexer: `README.md`, `docs/01-analise-referencias.md`, `docs/02-arquitetura.md` e `docs/03-direcao-visual.md`.
- O Next 16 tem mudanças de API: consulte `node_modules/next/dist/docs/` antes de usar recursos do framework.

## Já está pronto e funcionando
- Home com hero, busca rápida em vidro (glassmorphism) sobre a foto, destaques, carrocerias, venda seu carro, simulador, "sobre" e CTA final.
- `/estoque` com filtros derivados dos dados, facetas com contagem, URL compartilhável, ordenação, chips, estado vazio e drawer no mobile.
- `/veiculo/[slug]` com galeria (swipe, teclado, tela cheia, zoom), ficha técnica, equipamentos, simulação, semelhantes e JSON-LD.
- `/venda-seu-carro`, `/financiamento` e `/contato`. O WhatsApp é montado só em `lib/whatsapp.ts`.
- Componente `components/ui/select.tsx` (listbox acessível): vidro no desktop e bottom sheet no mobile.
- Testes: `npm test` (29 unitários) e `npm run test:e2e` (27 E2E com Playwright, desktop e mobile; requer `npm run build` antes).

## Dados DEMO (não inventar dados reais)
- Estoque: `data/vehicles.demo.ts`. Fotos: `data/vehicle-images.ts` (única fonte de imagens; hoje são silhuetas "FOTO DEMO").
- Contatos: `config/site.ts` (`isPlaceholder: true`). Taxa de financiamento: `config/finance.ts` (`isDemoRate: true`).
- A UI só acessa dados por `lib/vehicles/` (contrato `VehicleRepository`, pensado para trocar por MongoDB no futuro).

## PRÓXIMA TAREFA: refazer o hero da home
Ideia aprovada pelo cliente: o **nome "INGÁ" gigante ao fundo** e um **carro de luxo recortado na frente**, cobrindo a parte de baixo das letras, no mesmo espírito do logo (carro na frente do escudo).

1. **Imagem do carro:** o cliente vai colocar a foto em `public/images/hero/`. É um Honda Civic preto em estúdio com fundo preto, original de 2000×1116.
   - Gere uma versão 4K (3840 px de largura) com IA de ampliação (ex.: Real-ESRGAN x4plus, reduzindo depois para 3840 com Lanczos). Confira de perto se não surgiram artefatos no logo da Honda, nas rodas ou nos faróis.
   - Gere um **PNG/WebP com fundo transparente** (recorte do carro). Isso é necessário para o carro ficar na frente do texto. Se o recorte automático ficar ruim, peça ao cliente para usar o remove.bg.
   - Registre as imagens em `data/vehicle-images.ts` (ex.: `heroImage`, `heroCutout`). Nunca coloque caminho de imagem direto no componente.
2. **Fonte do nome gigante:** o logo usa serifada pesada. As opções são **B = Playfair Display 900** (recomendada, mais fiel ao logo e com cara de capa de revista) ou **D = Archivo Expanded 900** (mais esportiva). **Pergunte ao cliente qual prefere antes de fechar.** Carregue com `next/font/google` em `app/layout.tsx` e exponha como token em `app/globals.css` (`@theme`).
3. **Composição** em `components/home/hero-showcase.tsx`:
   - Camadas: fundo escuro → "INGÁ" gigante → carro recortado (com sombra de chão) → textos, CTA e busca em vidro.
   - Animação discreta na entrada (o nome surge e o carro desliza alguns px), respeitando `prefers-reduced-motion`.
   - No mobile, compor de novo, não só encolher: nome em cima e carro mais embaixo e maior.
   - Manter a busca rápida em vidro (`components/forms/quick-search.tsx`) e a faixa de destaques.
   - Imagem do hero com `priority` (LCP) e `sizes` correto.
4. **Logo:** o cliente vai mandar o logo em alta qualidade. Substitua `components/layout/brand-mark.tsx` (hoje é texto provisório) pelo SVG/PNG.
5. **Cores:** o vermelho do logo é mais fechado (carmim) que o `#E30613` atual. Ajuste só os tokens em `app/globals.css` e confira o contraste (WCAG AA).

## Regras do projeto
- Nada de glassmorphism espalhado (só na busca e nas listas), gradiente colorido, cantos muito arredondados, excesso de sombras, depoimentos, números ou estatísticas inventados.
- Vermelho controlado: CTA, preço, estado ativo e detalhes.
- Tipografia: display para títulos e números grandes; Manrope para a interface.
- Acessibilidade: foco visível, teclado, labels, alt text e botões reais.
- Antes de concluir, rode `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` e `npm run test:e2e`. Revise no navegador em 1440px e 390px.
- Commits em português, descritivos.
