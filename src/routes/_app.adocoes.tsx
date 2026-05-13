import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, FileText, Phone, Mail } from "lucide-react";
import { adocoes as initial, type Adocao } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/adocoes")({
  head: () => ({ meta: [{ title: "Adoções — Anjos Protetores" }] }),
  component: AdocoesPage,
});

function AdocoesPage() {
  const [list, setList] = useState<Adocao[]>(initial);
  const [selected, setSelected] = useState<Adocao | null>(initial[0]);

  const update = (id: string, status: Adocao["status"]) => {
    setList((l) => l.map((a) => (a.id === id ? { ...a, status } : a)));
    setSelected((s) => (s && s.id === id ? { ...s, status } : s));
    toast.success(`Solicitação ${status.toLowerCase()}`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <header>
        <h1 className="font-display font-bold text-3xl">Adoções</h1>
        <p className="text-muted-foreground">Acompanhe e gerencie todas as solicitações.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-3 bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
          <div className="divide-y divide-border">
            {list.map((a) => (
              <button
                key={a.id}
                onClick={() => setSelected(a)}
                className={`w-full text-left p-5 flex items-center gap-4 transition-colors ${
                  selected?.id === a.id ? "bg-primary/5" : "hover:bg-muted"
                }`}
              >
                <div className="size-12 rounded-2xl bg-secondary/15 text-secondary grid place-items-center font-bold">
                  {a.interessado.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold truncate">{a.interessado}</p>
                    <StatusBadge status={a.status} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Animal: <span className="text-foreground font-medium">{a.animal}</span> · {a.data}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div className="lg:col-span-2 space-y-6">
          {selected && (
            <>
              <div className="bg-card rounded-3xl border border-border p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-display font-bold text-xl">{selected.interessado}</h2>
                    <p className="text-xs text-muted-foreground">Protocolo #{selected.id}</p>
                  </div>
                  <StatusBadge status={selected.status} />
                </div>
                <dl className="space-y-3 text-sm">
                  <Info icon={Mail} label="E-mail" value={selected.email} />
                  <Info icon={Phone} label="Telefone" value={selected.telefone} />
                  <Info icon={FileText} label="Animal solicitado" value={selected.animal} />
                </dl>

                <div className="grid grid-cols-2 gap-2 mt-6">
                  <button
                    onClick={() => update(selected.id, "Aprovado")}
                    className="inline-flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-success text-success-foreground font-semibold hover:opacity-90"
                  >
                    <Check className="size-4" /> Aprovar
                  </button>
                  <button
                    onClick={() => update(selected.id, "Recusado")}
                    className="inline-flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-destructive/10 text-destructive font-semibold hover:bg-destructive/20"
                  >
                    <X className="size-4" /> Recusar
                  </button>
                </div>
                <button
                  onClick={() => toast.info("Termo de adoção gerado em PDF (demo)")}
                  className="mt-3 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90"
                >
                  <FileText className="size-4" /> Gerar termo de adoção
                </button>
              </div>

              <div className="bg-card rounded-3xl border border-border p-6 shadow-sm">
                <h3 className="font-display font-bold text-lg mb-4">Linha do tempo</h3>
                <ol className="space-y-5">
                  {[
                    { t: "Solicitação recebida", d: selected.data, done: true },
                    { t: "Análise de perfil", d: "Em andamento", done: selected.status !== "Pendente" },
                    { t: "Visita ao abrigo", d: "Aguardando agendamento", done: selected.status === "Aprovado" },
                    { t: "Termo assinado", d: "—", done: selected.status === "Aprovado" },
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`size-3 rounded-full ${step.done ? "bg-secondary" : "bg-border"} ring-4 ring-background`} />
                        {i < 3 && <div className="flex-1 w-px bg-border my-1" />}
                      </div>
                      <div className="pb-2">
                        <p className={`text-sm font-semibold ${step.done ? "text-foreground" : "text-muted-foreground"}`}>{step.t}</p>
                        <p className="text-xs text-muted-foreground">{step.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="size-4 text-muted-foreground shrink-0" />
      <div className="min-w-0">
        <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{label}</dt>
        <dd className="text-sm font-medium truncate">{value}</dd>
      </div>
    </div>
  );
}
