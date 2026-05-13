import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart, ArrowRight } from "lucide-react";
import { animais } from "@/lib/mock-data";
import logo from "@/assets/logo-anjos.png";
import { toast } from "sonner";

export const Route = createFileRoute("/publico")({
  head: () => ({
    meta: [
      { title: "Adote um amigo — Anjos Protetores" },
      { name: "description", content: "Conheça nossos animais disponíveis para adoção e mude duas vidas." },
    ],
  }),
  component: PublicoPage,
});

const especies = ["Todos", "Cão", "Gato"] as const;
const portes = ["Todos", "Pequeno", "Médio", "Grande"] as const;

function PublicoPage() {
  const [especie, setEspecie] = useState<(typeof especies)[number]>("Todos");
  const [porte, setPorte] = useState<(typeof portes)[number]>("Todos");

  const lista = useMemo(
    () =>
      animais
        .filter((a) => a.status === "Disponível")
        .filter((a) => especie === "Todos" || a.especie === especie)
        .filter((a) => porte === "Todos" || a.porte === porte),
    [especie, porte],
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Top */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/publico" className="flex items-center gap-3">
            <img src={logo} alt="" className="size-9" width={36} height={36} />
            <span className="font-display font-bold">Anjos Protetores</span>
          </Link>
          <Link
            to="/login"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Sou voluntário →
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-20 -right-20 size-80 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-10 size-80 bg-accent/20 rounded-full blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/15 text-secondary rounded-full text-xs font-bold uppercase tracking-wider">
            <Heart className="size-3" /> Adoção responsável
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-6xl mt-6 leading-tight">
            Eles esperam por <span className="text-accent">você</span>.
          </h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-xl mx-auto">
            Cada animal aqui tem uma história. Encontre seu novo melhor amigo
            entre os bichinhos disponíveis para adoção no Anjos Protetores.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="bg-card rounded-3xl border border-border p-5 flex flex-wrap items-center gap-6 shadow-sm">
          <FilterGroup label="Espécie" value={especie} onChange={setEspecie} options={especies} />
          <FilterGroup label="Porte" value={porte} onChange={setPorte} options={portes} />
          <p className="ml-auto text-sm text-muted-foreground">
            <span className="font-bold text-foreground">{lista.length}</span> amigos esperando
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lista.map((a) => (
            <article
              key={a.id}
              className="group bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={a.foto}
                  alt={a.nome}
                  width={800}
                  height={640}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display font-bold text-2xl">{a.nome}</h3>
                  <span className="text-xs font-bold text-secondary uppercase">{a.especie}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {a.raca} · {a.idade} · porte {a.porte.toLowerCase()}
                </p>
                <p className="text-sm text-foreground/80 mt-3 leading-relaxed">{a.descricao}</p>
                <button
                  onClick={() => toast.success(`Solicitação de adoção enviada para ${a.nome}!`, {
                    description: "Nossa equipe entrará em contato em até 48h.",
                  })}
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-accent text-accent-foreground font-bold hover:bg-accent/90 transition-all"
                >
                  Quero adotar <ArrowRight className="size-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {lista.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            Nenhum animal corresponde a estes filtros — tente abrir um pouco a busca.
          </p>
        )}
      </section>

      <footer className="border-t border-border bg-card mt-10">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-sm text-muted-foreground">
          © 2026 Anjos Protetores · Cada vida importa.
        </div>
      </footer>
    </div>
  );
}

function FilterGroup<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: readonly T[];
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
              value === o
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-border"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
