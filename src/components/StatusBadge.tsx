import type { AnimalStatus } from "@/lib/mock-data";

const styles: Record<string, string> = {
  Disponível: "bg-success/15 text-success",
  Adotado: "bg-muted text-muted-foreground",
  "Em tratamento": "bg-primary/15 text-primary",
  "Em espera": "bg-warning/20 text-warning-foreground",
  Pendente: "bg-accent/15 text-accent",
  "Em análise": "bg-primary/15 text-primary",
  Aprovado: "bg-success/15 text-success",
  Recusado: "bg-destructive/15 text-destructive",
};

export function StatusBadge({ status }: { status: AnimalStatus | string }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${
        styles[status] ?? "bg-muted text-muted-foreground"
      }`}
    >
      {status}
    </span>
  );
}
