import { createFileRoute, Link } from "@tanstack/react-router";
import {
  PawPrint,
  Heart,
  Package,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { animais, doacoes, adocoes, adocoesMensais } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Painel — Anjos Protetores" },
      { name: "description", content: "Visão geral do abrigo: animais, adoções, doações e alertas." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const disponiveis = animais.filter((a) => a.status === "Disponível").length;
  const adotados = animais.filter((a) => a.status === "Adotado").length;
  const estoque = doacoes.reduce((s, d) => s + d.quantidade, 0);
  const estoqueBaixo = doacoes.filter((d) => d.quantidade < d.minimo).length;
  const pendentes = adocoes.filter((a) => a.status === "Pendente").length;

  const stats = [
    { label: "Animais disponíveis", value: disponiveis, hint: "+3 esta semana", icon: PawPrint, tone: "primary" },
    { label: "Adoções no mês", value: 18, hint: "+12 vs abril", icon: Heart, tone: "secondary" },
    { label: "Itens em estoque", value: estoque, hint: "kg / unidades", icon: Package, tone: "accent" },
    { label: "Solicitações pendentes", value: pendentes, hint: "Aguardando análise", icon: AlertTriangle, tone: "warning" },
  ];

  const toneClasses: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/15 text-secondary",
    accent: "bg-accent/15 text-accent",
    warning: "bg-warning/20 text-warning-foreground",
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl text-foreground">Painel de controle</h1>
          <p className="text-muted-foreground">Bem-vinda, Mariana! Aqui está o resumo de hoje no abrigo.</p>
        </div>
        <Link
          to="/animais"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all"
        >
          + Cadastrar animal
        </Link>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-card p-6 rounded-3xl border border-border shadow-sm">
              <div className="flex items-start justify-between">
                <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
                <span className={`size-9 rounded-xl grid place-items-center ${toneClasses[s.tone]}`}>
                  <Icon className="size-5" />
                </span>
              </div>
              <p className="mt-3 font-display font-bold text-4xl text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="size-3" /> {s.hint}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card p-6 rounded-3xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-bold text-lg">Adoções por mês</h2>
              <p className="text-xs text-muted-foreground">Últimos 5 meses</p>
            </div>
            <span className="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-lg">+24%</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={adocoesMensais}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.74 0.13 180)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.74 0.13 180)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 240)" />
                <XAxis dataKey="mes" stroke="oklch(0.55 0.03 250)" fontSize={12} />
                <YAxis stroke="oklch(0.55 0.03 250)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.01 240)" }} />
                <Area type="monotone" dataKey="adocoes" stroke="oklch(0.74 0.13 180)" strokeWidth={3} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card p-6 rounded-3xl border border-border shadow-sm">
          <h2 className="font-display font-bold text-lg mb-4">Estoque crítico</h2>
          <div className="space-y-4">
            {doacoes
              .filter((d) => d.quantidade < d.minimo)
              .map((d) => {
                const pct = Math.min(100, (d.quantidade / d.minimo) * 100);
                return (
                  <div key={d.id}>
                    <div className="flex justify-between items-baseline text-sm">
                      <span className="font-medium">{d.item}</span>
                      <span className="text-xs text-muted-foreground">
                        {d.quantidade}/{d.minimo} {d.unidade}
                      </span>
                    </div>
                    <div className="mt-2 w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            {estoqueBaixo === 0 && (
              <p className="text-sm text-muted-foreground">Tudo em ordem por aqui ✓</p>
            )}
          </div>
          <Link
            to="/doacoes"
            className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 bg-muted text-foreground rounded-2xl text-sm font-semibold hover:bg-border transition-colors"
          >
            Gerenciar estoque <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      {/* Recent adoptions + featured animals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-3xl border border-border shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-lg">Solicitações recentes</h2>
            <Link to="/adocoes" className="text-sm text-primary font-semibold hover:underline">
              Ver todas
            </Link>
          </div>
          <div className="divide-y divide-border">
            {adocoes.slice(0, 4).map((a) => (
              <div key={a.id} className="py-3 flex items-center gap-4">
                <div className="size-10 rounded-xl bg-primary/10 text-primary grid place-items-center font-bold text-sm">
                  {a.interessado.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{a.interessado}</p>
                  <p className="text-xs text-muted-foreground">
                    Interesse: <span className="text-foreground font-medium">{a.animal}</span>
                  </p>
                </div>
                <StatusBadge status={a.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card p-6 rounded-3xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-lg">Espécies por status</h2>
          </div>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={[{ n: "Cães", Disponíveis: 24, Tratamento: 4 }, { n: "Gatos", Disponíveis: 18, Tratamento: 2 }]}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 240)" />
                <XAxis dataKey="n" stroke="oklch(0.55 0.03 250)" fontSize={12} />
                <YAxis stroke="oklch(0.55 0.03 250)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.01 240)" }} />
                <Bar dataKey="Disponíveis" fill="oklch(0.72 0.15 230)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Tratamento" fill="oklch(0.72 0.18 50)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-success mt-2">42 animais sob nosso cuidado neste momento.</p>
          <p className="text-xs text-muted-foreground">{adotados} já encontraram um lar.</p>
        </div>
      </div>
    </div>
  );
}
