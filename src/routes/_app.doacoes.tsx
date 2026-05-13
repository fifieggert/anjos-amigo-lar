import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Minus, AlertTriangle, Package } from "lucide-react";
import { doacoes } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/doacoes")({
  head: () => ({ meta: [{ title: "Doações — Anjos Protetores" }] }),
  component: DoacoesPage,
});

const cats = ["Todos", "Ração", "Limpeza", "Brinquedos", "Medicamento"] as const;

function DoacoesPage() {
  const [cat, setCat] = useState<(typeof cats)[number]>("Todos");
  const lista = doacoes.filter((d) => cat === "Todos" || d.categoria === cat);
  const baixos = doacoes.filter((d) => d.quantidade < d.minimo).length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl">Doações & Estoque</h1>
          <p className="text-muted-foreground">Controle entradas e saídas de itens.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => toast.info("Saída registrada (demo)")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-border font-semibold hover:bg-muted"
          >
            <Minus className="size-4" /> Saída
          </button>
          <button
            onClick={() => toast.success("Nova doação registrada!")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/90"
          >
            <Plus className="size-4" /> Nova doação
          </button>
        </div>
      </header>

      {baixos > 0 && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-accent/10 border border-accent/30">
          <div className="size-10 grid place-items-center bg-accent text-accent-foreground rounded-xl">
            <AlertTriangle className="size-5" />
          </div>
          <div>
            <p className="font-bold text-accent">{baixos} itens com estoque baixo</p>
            <p className="text-xs text-foreground/70">
              Considere solicitar reposição para manter o cuidado dos animais.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
              cat === c
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-4 font-semibold">Item</th>
                <th className="px-6 py-4 font-semibold">Categoria</th>
                <th className="px-6 py-4 font-semibold">Quantidade</th>
                <th className="px-6 py-4 font-semibold">Entrada</th>
                <th className="px-6 py-4 font-semibold">Doador</th>
                <th className="px-6 py-4 font-semibold">Nível</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {lista.map((d) => {
                const baixo = d.quantidade < d.minimo;
                const pct = Math.min(100, (d.quantidade / Math.max(d.minimo, 1)) * 100);
                return (
                  <tr key={d.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 font-semibold flex items-center gap-3">
                      <Package className="size-4 text-muted-foreground" />
                      {d.item}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 bg-secondary/15 text-secondary rounded-full text-xs font-medium">
                        {d.categoria}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold">
                      {d.quantidade} {d.unidade}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{d.data}</td>
                    <td className="px-6 py-4 text-muted-foreground">{d.doador}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${baixo ? "bg-accent" : "bg-success"}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        {baixo && <span className="text-[10px] font-bold text-accent uppercase">Baixo</span>}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
