import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText, FileSpreadsheet } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { adocoesMensais, animais, doacoes } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/relatorios")({
  head: () => ({ meta: [{ title: "Relatórios — Anjos Protetores" }] }),
  component: RelatoriosPage,
});

function RelatoriosPage() {
  const especieData = [
    { name: "Cães", value: animais.filter((a) => a.especie === "Cão").length },
    { name: "Gatos", value: animais.filter((a) => a.especie === "Gato").length },
  ];
  const colors = ["oklch(0.72 0.15 230)", "oklch(0.72 0.18 50)"];

  const doacoesPorCat = ["Ração", "Limpeza", "Brinquedos", "Medicamento"].map((c) => ({
    cat: c,
    total: doacoes.filter((d) => d.categoria === c).reduce((s, d) => s + d.quantidade, 0),
  }));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl">Relatórios</h1>
          <p className="text-muted-foreground">Visão consolidada do abrigo com exportação.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => toast.success("Exportando CSV...")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-border font-semibold hover:bg-muted"
          >
            <FileSpreadsheet className="size-4" /> CSV
          </button>
          <button
            onClick={() => toast.success("Gerando PDF...")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
          >
            <FileText className="size-4" /> PDF
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-3xl border border-border shadow-sm">
          <h2 className="font-display font-bold text-lg mb-1">Adoções mensais</h2>
          <p className="text-xs text-muted-foreground mb-4">Total: 60 adoções no período</p>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={adocoesMensais}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 240)" />
                <XAxis dataKey="mes" stroke="oklch(0.55 0.03 250)" fontSize={12} />
                <YAxis stroke="oklch(0.55 0.03 250)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.01 240)" }} />
                <Bar dataKey="adocoes" fill="oklch(0.74 0.13 180)" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card p-6 rounded-3xl border border-border shadow-sm">
          <h2 className="font-display font-bold text-lg mb-1">Distribuição por espécie</h2>
          <p className="text-xs text-muted-foreground mb-4">{animais.length} animais cadastrados</p>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={especieData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={4}>
                  {especieData.map((_, i) => (
                    <Cell key={i} fill={colors[i]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.01 240)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card p-6 rounded-3xl border border-border shadow-sm lg:col-span-2">
          <h2 className="font-display font-bold text-lg mb-1">Doações por categoria</h2>
          <p className="text-xs text-muted-foreground mb-4">Quantidade total no estoque</p>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={doacoesPorCat} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 240)" />
                <XAxis type="number" stroke="oklch(0.55 0.03 250)" fontSize={12} />
                <YAxis type="category" dataKey="cat" stroke="oklch(0.55 0.03 250)" fontSize={12} width={100} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.01 240)" }} />
                <Bar dataKey="total" fill="oklch(0.72 0.18 50)" radius={[0, 12, 12, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-card p-6 rounded-3xl border border-border shadow-sm">
        <h2 className="font-display font-bold text-lg mb-4">Detalhamento de animais</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="py-3 font-semibold">ID</th>
                <th className="py-3 font-semibold">Nome</th>
                <th className="py-3 font-semibold">Espécie</th>
                <th className="py-3 font-semibold">Idade</th>
                <th className="py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {animais.map((a) => (
                <tr key={a.id}>
                  <td className="py-3 text-muted-foreground">{a.id}</td>
                  <td className="py-3 font-semibold">{a.nome}</td>
                  <td className="py-3">{a.especie} · {a.raca}</td>
                  <td className="py-3">{a.idade}</td>
                  <td className="py-3">{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
