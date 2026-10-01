"use client";

import { useRouter } from "next/navigation";
import { useId, useMemo, useState, type FormEvent } from "react";
import { PARAM, stockHref } from "@/lib/filters/params";
import { formatPrice } from "@/lib/format";
import type { QuickSearchData } from "@/lib/vehicles/summaries";
import { ChevronDown, Search } from "@/components/ui/icons";


/**
 * Busca rápida da home. É um <form method="get"> real (funciona sem JS);
 * com JS, monta uma URL limpa sem parâmetros vazios.
 */
export function QuickSearch({ data }: { data: QuickSearchData }) {
  const id = useId();
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [yearMin, setYearMin] = useState("");
  const [yearMax, setYearMax] = useState("");

  const models = useMemo(() => {
    if (brand) return data.brands.find((b) => b.value === brand)?.models ?? [];
    return [];
  }, [brand, data.brands]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const n = (s: string) => (s ? Number(s) : undefined);
    router.push(
      stockHref({
        brand: brand ? [brand] : [],
        model: model ? [model] : [],
        priceMin: n(priceMin),
        priceMax: n(priceMax),
        yearMin: n(yearMin),
        yearMax: n(yearMax),
      }),
    );
  }

  const field = (
    key: string,
    label: string,
    name: string,
    value: string,
    onChange: (v: string) => void,
    options: { value: string | number; label: string }[],
    placeholder: string,
    disabled = false,
    className = "",
  ) => (
    <div className={`relative ${className}`}>
      <label htmlFor={`${id}-${key}`} className="pointer-events-none absolute left-4 top-2.5 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-mute">
        {label}
      </label>
      <select
        id={`${id}-${key}`}
        name={name}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="tnum h-16 w-full appearance-none bg-white pb-2 pl-4 pr-9 pt-6 text-[0.9375rem] font-semibold text-ink focus:outline-2 focus:-outline-offset-2 focus:outline-ink disabled:text-mute"
        data-testid={`qs-${key}`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-mute" />
    </div>
  );

  const prices = data.priceSteps.map((p) => ({ value: p, label: formatPrice(p) }));
  const years = data.years.map((y) => ({ value: y, label: String(y) }));

  return (
    <form
      action="/estoque"
      method="get"
      onSubmit={onSubmit}
      role="search"
      aria-label="Busca rápida de veículos"
      className="grid grid-cols-2 gap-px bg-line md:grid-cols-4 xl:grid-cols-[1.3fr_1.3fr_1fr_1fr_0.8fr_0.8fr_auto]"
    >
      {field(
        "brand",
        "Marca",
        PARAM.brand,
        brand,
        (v) => {
          setBrand(v);
          setModel("");
        },
        data.brands.map((b) => ({ value: b.value, label: b.label })),
        "Todas",
      )}
      {field("model", "Modelo", PARAM.model, model, setModel, models, brand ? "Todos" : "Escolha a marca", !brand)}
      {field("pmin", "Preço mín.", PARAM.priceMin, priceMin, setPriceMin, prices.filter((p) => !priceMax || p.value <= Number(priceMax)), "Qualquer")}
      {field("pmax", "Preço máx.", PARAM.priceMax, priceMax, setPriceMax, prices.filter((p) => !priceMin || p.value >= Number(priceMin)), "Qualquer")}
      {field("ymin", "Ano de", PARAM.yearMin, yearMin, setYearMin, years.filter((y) => !yearMax || y.value <= Number(yearMax)), "Todos")}
      {field("ymax", "Ano até", PARAM.yearMax, yearMax, setYearMax, years.filter((y) => !yearMin || y.value >= Number(yearMin)), "Todos")}
      <button
        type="submit"
        className="col-span-2 inline-flex h-16 items-center justify-center gap-3 bg-red px-8 text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-red-deep md:col-span-4 xl:col-span-1"
        data-testid="qs-submit"
      >
        <Search className="text-lg" /> Buscar veículos
      </button>
    </form>
  );
}
