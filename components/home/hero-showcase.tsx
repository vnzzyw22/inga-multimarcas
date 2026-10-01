"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import type { Vehicle } from "@/types/vehicle";
import { heroImage } from "@/data/vehicle-images";
import { formatMileage, formatPrice, formatYear } from "@/lib/format";
import { ButtonLink } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";

/**
 * Hero: o veículo é o protagonista. Mostra os destaques um a um, com troca
 * manual (sem autoplay — ninguém perde o que estava lendo).
 */
export function HeroShowcase({ featured, search }: { featured: Vehicle[]; search?: ReactNode }) {
  const [i, setI] = useState(0);
  const total = featured.length;
  const v = featured[i];
  const img = v?.images[0] ?? heroImage;
  const go = (d: number) => setI((x) => (x + d + total) % total);

  return (
    <section className="relative isolate z-10 flex min-h-[max(640px,min(100svh,980px))] flex-col bg-ink text-paper" aria-label="Destaque">
      {/* Recorte próprio da foto: a seção não corta nada, para as listas da busca poderem abrir */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={img.src + i}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <Image src={img.src} alt={img.alt} fill priority={i === 0} sizes="100vw" className="object-cover object-[60%_center]" />
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Véu para legibilidade do texto sobre a foto */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/40 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-ink to-transparent" />

      <div className="container-x flex flex-1 flex-col justify-end pb-8 pt-28 lg:pb-12 lg:pt-36">
        <p className="eyebrow text-paper/70">Ingá Multimarcas</p>
        <h1 className="display mt-5 max-w-[14ch] text-[3.25rem] sm:text-7xl lg:text-8xl xl:text-[7.5rem]">
          Escolha no estoque.
          <span className="block text-paper/55">Fale direto com a loja.</span>
        </h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/estoque" size="lg">
            Ver estoque <ArrowRight className="text-base transition-transform group-hover:translate-x-1" />
          </ButtonLink>
          <ButtonLink href="/venda-seu-carro" size="lg" variant="outline-light" className="max-sm:hidden">
            Avaliar meu carro
          </ButtonLink>
        </div>
        {search ? <div className="relative z-20 mt-10 lg:mt-14">{search}</div> : null}
      </div>

      {v ? (
        <div className="border-t border-paper/15">
          <div className="container-x flex items-stretch justify-between gap-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="min-w-0 py-5"
              >
                <Link href={`/veiculo/${v.slug}`} className="group block">
                  <p className="tnum text-xs text-paper/60">
                    Destaque · {formatYear(v)} · {formatMileage(v.mileage)}
                  </p>
                  <p className="mt-1 flex flex-wrap items-baseline gap-x-4">
                    <span className="display truncate text-2xl group-hover:underline group-hover:decoration-red group-hover:decoration-2 group-hover:underline-offset-4 sm:text-3xl">
                      {v.brand} {v.model}
                    </span>
                    <span className="tnum font-display text-xl text-red-on-dark sm:text-2xl">{formatPrice(v.price)}</span>
                  </p>
                </Link>
              </motion.div>
            </AnimatePresence>
            {total > 1 ? (
              <div className="flex shrink-0 items-center gap-1">
                <span className="tnum mr-3 hidden text-xs font-bold tracking-[0.14em] text-paper/60 sm:inline" aria-live="polite">
                  {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <button type="button" onClick={() => go(-1)} className="inline-flex size-11 items-center justify-center border border-paper/25 text-lg hover:border-paper" aria-label="Destaque anterior">
                  <ArrowLeft />
                </button>
                <button type="button" onClick={() => go(1)} className="inline-flex size-11 items-center justify-center border border-paper/25 text-lg hover:border-paper" aria-label="Próximo destaque">
                  <ArrowRight />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
