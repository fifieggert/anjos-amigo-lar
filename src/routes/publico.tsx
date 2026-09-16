import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, useCallback } from "react";
import {
  Heart,
  ArrowRight,
  PawPrint,
  HandHeart,
  Search,
  FileText,
  ClipboardCheck,
  Home,
  Mail,
  MapPin,
  Phone,
  Instagram,
  Facebook,
  Menu,
  X,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin as MapPinIcon,
} from "lucide-react";
import { animais, type Animal } from "@/lib/mock-data";
import logoAsset from "@/assets/logo-anjos.png.asset.json";
const logo = logoAsset.url;
import hero from "@/assets/hero-adocao.jpg";
import { toast } from "sonner";

export const Route = createFileRoute("/publico")({
  head: () => ({
    meta: [
      { title: "Anjos Protetores — Encontre um novo melhor amigo" },
      {
        name: "description",
        content:
          "Adote um animal resgatado pelo Anjos Protetores. Conheça cães e gatos disponíveis, contribua com doações e mude duas vidas.",
      },
      { property: "og:title", content: "Anjos Protetores — Adote um amigo" },
      { property: "og:description", content: "Cães e gatos resgatados esperando uma família." },
    ],
  }),
  component: PublicoPage,
});

function PublicoPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <ImpactStrip />
      <EventosCarousel />
      <AnimaisSection />
      <ComoFunciona />
      <SobreSection />
      <DoacoesSection />
      <Footer />
    </div>
  );
}

/* ---------- Navbar ---------- */
function Navbar({
  scrolled,
  menuOpen,
  setMenuOpen,
}: {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}) {
  const links = [
    { label: "Início", href: "#inicio" },
    { label: "Animais", href: "#animais" },
    { label: "Eventos", href: "#eventos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Doações", href: "#doacoes" },
  ];
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled
          ? "bg-card/85 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2.5">
          <img src={logo} alt="" className="size-9" width={36} height={36} />
          <span className="font-display font-bold text-lg">Anjos Protetores</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2 rounded-full text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/login"
            className="ml-2 px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors"
          >
            Login
          </Link>
        </nav>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-card border-t border-border px-6 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-sm font-semibold hover:bg-muted"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/login"
            className="mt-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-bold text-center"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="inicio" className="relative pt-28 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      <div className="absolute -top-32 -left-32 size-[28rem] bg-secondary/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 -right-20 size-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/15 text-secondary rounded-full text-xs font-bold uppercase tracking-wider">
            <Heart className="size-3.5" /> Adoção responsável
          </span>
          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl mt-6 leading-[1.05] tracking-tight">
            Encontre um <br />
            novo <span className="text-accent">melhor amigo</span>
          </h1>
          <p className="text-lg text-muted-foreground mt-6 max-w-xl leading-relaxed">
            Somos um abrigo dedicado a resgatar, cuidar e encontrar lares amorosos
            para cães e gatos. Cada animal aqui tem uma história — e você pode
            escrever o próximo capítulo dela.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#animais"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-accent text-accent-foreground font-bold shadow-lg shadow-accent/25 hover:bg-accent/90 hover:-translate-y-0.5 transition-all"
            >
              <PawPrint className="size-5" />
              Quero adotar
            </a>
            <a
              href="#doacoes"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-card border-2 border-border font-bold hover:border-primary hover:text-primary transition-all"
            >
              <HandHeart className="size-5" />
              Fazer doação
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/20 ring-1 ring-border">
            <img
              src={hero}
              alt="Cachorro e gato felizes na grama ao sol"
              width={1600}
              height={1120}
              className="w-full h-full object-cover"
              fetchPriority="high"
            />
          </div>
          <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-xl border border-border p-4 gap-3 items-center">
            <div className="size-12 rounded-xl bg-success/15 grid place-items-center">
              <Heart className="size-6 text-success" />
            </div>
            <div>
              <p className="font-display font-bold text-2xl leading-none">+428</p>
              <p className="text-xs text-muted-foreground mt-1">vidas transformadas</p>
            </div>
          </div>
          <div className="hidden sm:flex absolute -top-4 -right-4 bg-card rounded-2xl shadow-xl border border-border px-4 py-3 items-center gap-2">
            <span className="size-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-bold">42 amigos disponíveis</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Impacto ---------- */
function ImpactStrip() {
  const stats = [
    { icon: Home, label: "Animais adotados", value: "428" },
    { icon: PawPrint, label: "Animais resgatados", value: "612" },
    { icon: HandHeart, label: "Doações recebidas", value: "1.847" },
    { icon: Heart, label: "Famílias felizes", value: "390" },
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 -mt-4">
      <div className="bg-card rounded-3xl border border-border shadow-lg p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-primary/10 grid place-items-center shrink-0">
              <s.icon className="size-7 text-primary" />
            </div>
            <div>
              <p className="font-display font-bold text-3xl leading-none">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Eventos ---------- */
const eventos = [
  {
    id: 1,
    titulo: "Feira de Adoção de Sábado",
    data: "14 de Junho, 2026",
    horario: "09:00 – 16:00",
    local: "Parque do Ibirapuera, São Paulo",
    descricao: "Venha conhecer nossos peludos resgatados! Teremos cães e gatos prontos para adoção responsável."
  },
  {
    id: 2,
    titulo: "Dia da Vacinação Gratuita",
    data: "22 de Junho, 2026",
    horario: "08:00 – 12:00",
    local: "Unidade Anjos Protetores, Zona Sul",
    descricao: "Vacinação antirrábica e vermifugação gratuita para cães e gatos. Leve seu documento."
  },
  {
    id: 3,
    titulo: "Mutirão de Castração",
    data: "05 de Julho, 2026",
    horario: "07:00 – 17:00",
    local: "Clínica Parceira VetCare",
    descricao: "50 vagas para castração de baixa renda. Inscrições abertas pelo site até 01/07."
  },
  {
    id: 4,
    titulo: "Workshop: Cuidados com Filhotes",
    data: "12 de Julho, 2026",
    horario: "14:00 – 16:00",
    local: "Online (YouTube Live)",
    descricao: "Aprenda sobre alimentação, socialização e primeiros cuidados com veterinária especializada."
  },
  {
    id: 5,
    titulo: "Arraiá dos Peludos",
    data: "26 de Julho, 2026",
    horario: "10:00 – 18:00",
    local: "Praça da Pampulha, Belo Horizonte",
    descricao: "Festa junina temática com adoção, barracas de comida, brincadeiras e muito amor pet."
  },
];

function EventosCarousel() {
  const [idx, setIdx] = useState(0);
  const visiveis = 3;
  const maxIdx = Math.max(0, eventos.length - visiveis);

  const next = useCallback(() => setIdx((i) => Math.min(i + 1, maxIdx)), [maxIdx]);
  const prev = useCallback(() => setIdx((i) => Math.max(i - 1, 0)), []);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section id="eventos" className="bg-gradient-to-b from-secondary/5 to-transparent py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-accent mb-3">Fique por dentro</p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight">Próximos eventos</h2>
            <p className="text-muted-foreground mt-3 max-w-xl">
              Participe de feiras de adoção, vacinações gratuitas e muito mais.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prev}
              disabled={idx === 0}
              className="size-11 rounded-2xl bg-card border border-border grid place-items-center hover:bg-muted disabled:opacity-40 transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={next}
              disabled={idx >= maxIdx}
              className="size-11 rounded-2xl bg-card border border-border grid place-items-center hover:bg-muted disabled:opacity-40 transition-colors"
              aria-label="Próximo"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${idx * (100 / visiveis + 2)}%)` }}
          >
            {eventos.map((e) => (
              <article
                key={e.id}
                className="min-w-[calc(33.333%-1rem)] flex-1 bg-card rounded-3xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider w-fit">
                  <Calendar className="size-3.5" />
                  {e.data}
                </div>
                <h3 className="font-display font-bold text-xl mt-4">{e.titulo}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed flex-1">{e.descricao}</p>
                <div className="mt-5 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="size-4 text-secondary" />
                    <span>{e.horario}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPinIcon className="size-4 text-secondary" />
                    <span>{e.local}</span>
                  </div>
                </div>
                <button
                  onClick={() => toast.success(`Lembrete salvo para: ${e.titulo}`)}
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-accent text-accent-foreground font-bold hover:bg-accent/90 transition-all"
                >
                  Quero ir <ArrowRight className="size-4" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Animais ---------- */
const especies = ["Todos", "Cão", "Gato"] as const;

function AnimaisSection() {
  const [especie, setEspecie] = useState<(typeof especies)[number]>("Todos");
  const [selecionado, setSelecionado] = useState<Animal | null>(null);
  const lista = useMemo(
    () =>
      animais
        .filter((a) => a.status === "Disponível")
        .filter((a) => especie === "Todos" || a.especie === especie),
    [especie],
  );

  return (
    <section id="animais" className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-3">
            Disponíveis para adoção
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight">
            Conheça quem está esperando você
          </h2>
        </div>
        <div className="flex gap-2">
          {especies.map((o) => (
            <button
              key={o}
              onClick={() => setEspecie(o)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                especie === o
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-border"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lista.map((a) => (
          <article
            key={a.id}
            onClick={() => setSelecionado(a)}
            className="group cursor-pointer bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={a.foto}
                alt={a.nome}
                width={800}
                height={640}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 bg-card/95 backdrop-blur rounded-full text-[11px] font-bold uppercase">
                <span className="size-1.5 rounded-full bg-success" />
                {a.status}
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display font-bold text-2xl">{a.nome}</h3>
                <span className="text-xs font-bold text-secondary uppercase">{a.especie}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <Tag>{a.idade}</Tag>
                <Tag>Porte {a.porte.toLowerCase()}</Tag>
                {a.vacinado && <Tag tone="success">Vacinado</Tag>}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelecionado(a);
                }}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-foreground text-background font-bold hover:bg-foreground/90 transition-all"
              >
                Ver mais <ArrowRight className="size-4" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {lista.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          Nenhum animal corresponde a este filtro.
        </p>
      )}

      {selecionado && (
        <AnimalDetalheModal animal={selecionado} onClose={() => setSelecionado(null)} />
      )}
    </section>
  );
}

/* ---------- Modal de detalhes + formulário ---------- */
function AnimalDetalheModal({ animal, onClose }: { animal: Animal; onClose: () => void }) {
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nome = (data.get("nome") as string)?.trim();
    const cpf = (data.get("cpf") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    if (!nome || !cpf || !email) {
      toast.error("Preencha os campos obrigatórios.");
      return;
    }
    setEnviando(true);
    setTimeout(() => {
      setEnviando(false);
      toast.success(`Solicitação enviada para adotar ${animal.nome}!`, {
        description: "Nossa equipe entrará em contato em até 48h.",
      });
      onClose();
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-card rounded-3xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-border bg-card/95 backdrop-blur">
          <h2 className="font-display font-bold text-xl">Quero adotar {animal.nome}</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted"
            aria-label="Fechar"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-0">
          {/* Detalhes do animal */}
          <div className="p-6 lg:border-r border-border">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
              <img src={animal.foto} alt={animal.nome} className="w-full h-full object-cover" />
            </div>
            <div className="mt-5">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display font-bold text-3xl">{animal.nome}</h3>
                <span className="text-xs font-bold text-secondary uppercase">{animal.especie}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{animal.raca} • {animal.id}</p>
              <p className="mt-4 text-sm leading-relaxed">{animal.descricao}</p>
              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <InfoItem label="Idade" value={animal.idade} />
                <InfoItem label="Porte" value={animal.porte} />
                <InfoItem label="Vacinado" value={animal.vacinado ? "Sim" : "Não"} />
                <InfoItem label="Castrado" value={animal.castrado ? "Sim" : "Não"} />
              </dl>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-accent">Formulário de adoção</p>
              <h4 className="font-display font-bold text-xl mt-1">Conte um pouco sobre você</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Seus dados são confidenciais e usados apenas no processo de adoção.
              </p>
            </div>

            <FormInput name="nome" label="Nome completo" placeholder="Maria da Silva" required />
            <div className="grid grid-cols-2 gap-3">
              <FormInput name="cpf" label="CPF" placeholder="000.000.000-00" required />
              <FormInput name="nascimento" label="Data de nascimento" type="date" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormInput name="email" label="E-mail" type="email" placeholder="voce@email.com" required />
              <FormInput name="telefone" label="Telefone / WhatsApp" placeholder="(11) 99999-0000" required />
            </div>
            <FormInput name="endereco" label="Endereço completo" placeholder="Rua, número, bairro, cidade — UF" required />
            <div className="grid grid-cols-2 gap-3">
              <FormInput name="cep" label="CEP" placeholder="00000-000" />
              <FormInput name="renda" label="Renda mensal (R$)" placeholder="3500" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormSelect name="moradia" label="Tipo de moradia" options={["Casa", "Apartamento", "Sítio/Chácara"]} />
              <FormSelect name="outros" label="Tem outros animais?" options={["Não", "Sim, cães", "Sim, gatos", "Sim, ambos"]} />
            </div>
            <div>
              <label className="text-sm font-semibold">Por que deseja adotar {animal.nome}?</label>
              <textarea
                name="motivo"
                rows={3}
                placeholder="Conte um pouco sobre sua rotina e o que te motiva a adotar..."
                className="mt-1 w-full px-4 py-3 bg-muted rounded-2xl outline-none text-sm focus:ring-2 ring-primary"
              />
            </div>
            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input type="checkbox" required className="mt-0.5" />
              <span>
                Concordo com os termos de adoção responsável e autorizo o contato da equipe do Anjos Protetores.
              </span>
            </label>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-5 py-3 rounded-2xl border border-border font-semibold hover:bg-muted"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={enviando}
                className="flex-1 px-5 py-3 rounded-2xl bg-accent text-accent-foreground font-bold hover:bg-accent/90 disabled:opacity-60"
              >
                {enviando ? "Enviando..." : "Enviar solicitação"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted/60 rounded-xl px-3 py-2">
      <dt className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">{label}</dt>
      <dd className="font-semibold mt-0.5">{value}</dd>
    </div>
  );
}

function FormInput({
  name,
  label,
  type = "text",
  placeholder,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full px-4 py-3 bg-muted rounded-2xl outline-none text-sm focus:ring-2 ring-primary"
      />
    </label>
  );
}

function FormSelect({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <select
        name={name}
        className="mt-1 w-full px-4 py-3 bg-muted rounded-2xl outline-none text-sm focus:ring-2 ring-primary"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function Tag({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "success";
}) {
  const cls =
    tone === "success"
      ? "bg-success/15 text-success"
      : "bg-muted text-muted-foreground";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${cls}`}>
      {children}
    </span>
  );
}

/* ---------- Como funciona ---------- */
function ComoFunciona() {
  const steps = [
    { icon: Search, title: "Escolha um animal", desc: "Navegue pelos perfis e encontre seu match." },
    { icon: FileText, title: "Envie a solicitação", desc: "Preencha um formulário rápido em 2 minutos." },
    { icon: ClipboardCheck, title: "Passe pela análise", desc: "Conversa com nossa equipe para garantir o lar ideal." },
    { icon: Home, title: "Adote com amor", desc: "Leve seu novo amigo para casa e mude duas vidas." },
  ];
  return (
    <section className="bg-gradient-to-b from-secondary/5 to-transparent py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-wider text-accent mb-3">Processo simples</p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight">
            Como funciona a adoção
          </h2>
          <p className="text-muted-foreground mt-4">
            Em 4 passos simples você dá um lar para um animal que precisa.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="hidden md:block absolute top-9 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary via-secondary to-accent opacity-30" />
          {steps.map((s, i) => (
            <div key={s.title} className="relative bg-card rounded-3xl border border-border p-6 hover:shadow-lg transition-shadow">
              <div className="size-[4.5rem] rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground grid place-items-center mb-4 shadow-lg shadow-primary/20">
                <s.icon className="size-8" />
              </div>
              <span className="absolute top-6 right-6 font-display font-bold text-3xl text-muted-foreground/30">
                0{i + 1}
              </span>
              <h3 className="font-display font-bold text-xl">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Sobre ---------- */
function SobreSection() {
  return (
    <section id="sobre" className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
      <div className="order-2 lg:order-1">
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Sobre o abrigo</p>
        <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight leading-tight">
          Há 8 anos cuidando de quem mais precisa
        </h2>
        <p className="text-muted-foreground mt-5 leading-relaxed">
          O Anjos Protetores nasceu em São Paulo em 2018 com uma missão clara:
          oferecer abrigo digno, cuidados veterinários e uma segunda chance para
          animais resgatados das ruas. Trabalhamos em parceria com voluntários,
          clínicas e famílias adotantes.
        </p>
        <ul className="mt-6 space-y-3 text-sm">
          {[
            "Atendimento veterinário completo para todos os animais",
            "Processo de adoção criterioso e acompanhado",
            "Lar temporário e suporte pós-adoção",
            "Mais de 90% dos animais adotados em até 6 meses",
          ].map((t) => (
            <li key={t} className="flex items-start gap-3">
              <span className="mt-1 size-5 rounded-full bg-success/15 grid place-items-center shrink-0">
                <Heart className="size-3 text-success" fill="currentColor" />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="order-1 lg:order-2 relative">
        <div className="aspect-square rounded-[2rem] overflow-hidden shadow-xl ring-1 ring-border">
          <img
            src={hero}
            alt="Animais resgatados pelo Anjos Protetores"
            width={900}
            height={900}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground rounded-3xl p-6 shadow-xl max-w-[14rem]">
          <p className="font-display font-bold text-3xl leading-none">8 anos</p>
          <p className="text-sm mt-2 opacity-90">transformando histórias com muito amor.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Doações ---------- */
function DoacoesSection() {
  return (
    <section id="doacoes" className="max-w-7xl mx-auto px-6 pb-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground p-10 sm:p-14">
        <div className="absolute -top-20 -right-20 size-80 bg-accent/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 size-80 bg-secondary/40 rounded-full blur-3xl" />
        <div className="relative grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur rounded-full text-xs font-bold uppercase tracking-wider">
              <HandHeart className="size-3.5" /> Faça parte
            </span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl mt-5 leading-tight">
              Sua doação salva vidas todos os dias
            </h2>
            <p className="mt-4 opacity-90 leading-relaxed">
              Com R$ 30 alimentamos um filhote por uma semana inteira. Toda
              contribuição — ração, medicamentos, brinquedos ou valores — chega
              direto a quem precisa.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => toast.success("Obrigado! Redirecionando para o pagamento…")}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-accent text-accent-foreground font-bold shadow-lg hover:bg-accent/90 transition-all"
              >
                Doar agora <ArrowRight className="size-4" />
              </button>
              <button
                onClick={() => toast.info("Confira nossa lista de itens necessários.")}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white/10 backdrop-blur border border-white/30 font-bold hover:bg-white/20 transition-all"
              >
                Doar itens
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { v: "R$ 30", t: "Alimenta um filhote por 1 semana" },
              { v: "R$ 80", t: "Vacina e vermifuga 1 animal" },
              { v: "R$ 150", t: "Castração e cuidados pós" },
              { v: "R$ 300", t: "Tratamento veterinário completo" },
            ].map((d) => (
              <div key={d.v} className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-5">
                <p className="font-display font-bold text-2xl">{d.v}</p>
                <p className="text-sm opacity-90 mt-2">{d.t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="" className="size-9" width={36} height={36} />
            <span className="font-display font-bold text-lg">Anjos Protetores</span>
          </div>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            Adotar é um ato de amor que transforma duas vidas. Obrigado por
            fazer parte dessa missão.
          </p>
          <div className="flex gap-2 mt-5">
            <SocialBtn icon={Instagram} />
            <SocialBtn icon={Facebook} />
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold mb-4">Navegação</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#inicio" className="hover:text-foreground">Início</a></li>
            <li><a href="#animais" className="hover:text-foreground">Animais</a></li>
            <li><a href="#eventos" className="hover:text-foreground">Eventos</a></li>
            <li><a href="#sobre" className="hover:text-foreground">Sobre</a></li>
            <li><a href="#doacoes" className="hover:text-foreground">Doações</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold mb-4">Contato</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Mail className="size-4 text-primary" /><span>contato@anjosprotetores.org</span></li>
            <li className="flex items-center gap-2"><Phone className="size-4 text-primary" /><span>(11) 4002-8922</span></li>
            <li className="flex items-center gap-2"><MapPin className="size-4 text-primary" /><span>São Paulo, SP</span></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold mb-4">Acesso</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Voluntários e equipe do abrigo.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors"
          >
            Entrar no painel
          </Link>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-5 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Anjos Protetores · Cada vida importa.</p>
          <p className="italic">“Até que um deles tenha um lar, nenhum de nós descansa.”</p>
        </div>
      </div>
    </footer>
  );
}

function SocialBtn({ icon: Icon }: { icon: typeof Instagram }) {
  return (
    <button className="size-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground grid place-items-center transition-colors">
      <Icon className="size-4" />
    </button>
  );
}
