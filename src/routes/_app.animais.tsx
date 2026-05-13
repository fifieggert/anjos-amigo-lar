import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Plus, X } from "lucide-react";
import { animais, type Animal, type AnimalStatus } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/animais")({
  head: () => ({ meta: [{ title: "Animais — Anjos Protetores" }] }),
  component: AnimaisPage,
});

const STATUS: (AnimalStatus | "Todos")[] = ["Todos", "Disponível", "Em tratamento", "Em espera", "Adotado"];

function AnimaisPage() {
  const [q, setQ] = useState("");
  const [filtro, setFiltro] = useState<AnimalStatus | "Todos">("Todos");
  const [showModal, setShowModal] = useState(false);

  const lista = useMemo(
    () =>
      animais.filter(
        (a) =>
          (filtro === "Todos" || a.status === filtro) &&
          (a.nome.toLowerCase().includes(q.toLowerCase()) ||
            a.especie.toLowerCase().includes(q.toLowerCase())),
      ),
    [q, filtro],
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl">Gestão de animais</h1>
          <p className="text-muted-foreground">{lista.length} animais encontrados</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all"
        >
          <Plus className="size-4" /> Cadastrar animal
        </button>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 bg-card p-4 rounded-2xl border border-border">
        <div className="flex items-center bg-muted rounded-full px-4 py-2 flex-1 min-w-[220px]">
          <Search className="size-4 text-muted-foreground mr-2" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nome ou espécie..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {STATUS.map((s) => (
            <button
              key={s}
              onClick={() => setFiltro(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                filtro === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-border"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {lista.map((a) => (
          <AnimalCard key={a.id} a={a} />
        ))}
      </div>

      {showModal && <CadastroModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

function AnimalCard({ a }: { a: Animal }) {
  return (
    <article className="group bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all">
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        <img
          src={a.foto}
          alt={a.nome}
          width={800}
          height={640}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <StatusBadge status={a.status} />
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-display font-bold text-lg">{a.nome}</h3>
            <p className="text-xs text-muted-foreground">
              {a.especie} • {a.raca}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Porte</p>
            <p className="text-sm font-semibold">{a.porte}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border">
          <span className="px-2 py-0.5 bg-muted rounded-full text-[11px] font-medium">{a.idade}</span>
          {a.vacinado && (
            <span className="px-2 py-0.5 bg-success/10 text-success rounded-full text-[11px] font-medium">Vacinado</span>
          )}
          {a.castrado && (
            <span className="px-2 py-0.5 bg-secondary/15 text-secondary rounded-full text-[11px] font-medium">Castrado</span>
          )}
        </div>
      </div>
    </article>
  );
}

function CadastroModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Animal cadastrado com sucesso!", {
            description: "Os dados foram salvos no abrigo.",
          });
          onClose();
        }}
        className="bg-card rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
          <h2 className="font-display font-bold text-xl">Cadastrar novo animal</h2>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-muted">
            <X className="size-5" />
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nome" placeholder="Ex.: Pipoca" required />
          <Field label="Espécie" type="select" options={["Cão", "Gato"]} />
          <Field label="Raça" placeholder="Ex.: Vira-lata" />
          <Field label="Idade" placeholder="Ex.: 2 anos" />
          <Field label="Porte" type="select" options={["Pequeno", "Médio", "Grande"]} />
          <Field label="Status" type="select" options={["Disponível", "Em tratamento", "Em espera", "Adotado"]} />
          <div className="sm:col-span-2">
            <Field label="Foto (URL)" placeholder="https://..." />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-semibold">Descrição</label>
            <textarea
              rows={3}
              placeholder="Conte um pouco sobre a personalidade do animal..."
              className="mt-1 w-full px-4 py-3 bg-muted rounded-2xl outline-none text-sm focus:ring-2 ring-primary"
            />
          </div>
        </div>
        <div className="p-6 border-t border-border flex justify-end gap-3 bg-card sticky bottom-0">
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-2xl border border-border font-semibold hover:bg-muted">
            Cancelar
          </button>
          <button type="submit" className="px-5 py-2.5 rounded-2xl bg-accent text-accent-foreground font-bold hover:bg-accent/90">
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  type = "text",
  options,
  placeholder,
  required,
}: {
  label: string;
  type?: "text" | "select";
  options?: string[];
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      {type === "select" ? (
        <select
          required={required}
          className="mt-1 w-full px-4 py-3 bg-muted rounded-2xl outline-none text-sm focus:ring-2 ring-primary"
        >
          {options?.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          required={required}
          placeholder={placeholder}
          className="mt-1 w-full px-4 py-3 bg-muted rounded-2xl outline-none text-sm focus:ring-2 ring-primary"
        />
      )}
    </label>
  );
}
