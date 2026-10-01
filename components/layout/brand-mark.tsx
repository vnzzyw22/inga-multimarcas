/**
 * ⚠️ PROVISÓRIO — marca tipográfica até recebermos o logo oficial da Ingá.
 * Ao receber o arquivo (SVG preferencialmente), substitua o conteúdo deste
 * componente; header e footer não precisam mudar.
 */
export function BrandMark({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-2 leading-none ${className}`}>
      <span className={`font-display text-[1.65rem] font-bold uppercase tracking-tight ${tone === "light" ? "text-paper" : "text-ink"}`}>
        Ingá
      </span>
      <span className={`font-sans text-[0.625rem] font-bold uppercase tracking-[0.28em] ${tone === "light" ? "text-mute-dark" : "text-mute"}`}>
        Multimarcas
      </span>
    </span>
  );
}
