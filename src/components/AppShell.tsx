import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  PawPrint,
  Gift,
  Home,
  BarChart3,
  Globe,
  LogOut,
  Search,
  Menu,
  Bell,
} from "lucide-react";
import { useState } from "react";
import logoAsset from "@/assets/logo-anjos.png.asset.json";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/animais", label: "Animais", icon: PawPrint },
  { to: "/doacoes", label: "Doações", icon: Gift },
  { to: "/adocoes", label: "Adoções", icon: Home },
  { to: "/relatorios", label: "Relatórios", icon: BarChart3 },
  { to: "/publico", label: "Área Pública", icon: Globe },
] as const;

export function AppShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-foreground/30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 z-40 h-screen w-64 shrink-0 bg-card border-r border-border flex flex-col transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6 flex items-center gap-3">
          <img src={logo} alt="Anjos Protetores" className="size-10 rounded-xl bg-secondary/15 p-1" width={40} height={40} />
          <div className="leading-tight">
            <p className="font-display font-bold text-foreground">Anjos</p>
            <p className="font-display font-bold text-primary -mt-0.5">Protetores</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {nav.map((item) => {
            const active = path.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-secondary/15 text-secondary"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon className="size-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 space-y-3">
          <div className="bg-accent/10 p-4 rounded-2xl">
            <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">
              Estoque baixo
            </p>
            <p className="text-sm text-foreground/80 leading-tight">
              Ração para filhotes está acabando.
            </p>
          </div>
          <Link
            to="/login"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
          >
            <LogOut className="size-5" />
            Sair
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-card/80 backdrop-blur border-b border-border sticky top-0 z-20 flex items-center justify-between px-4 lg:px-8 gap-4">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="size-5" />
          </button>

          <div className="hidden sm:flex items-center bg-muted rounded-full px-4 py-2 flex-1 max-w-md">
            <Search className="size-4 text-muted-foreground mr-2" />
            <input
              type="text"
              placeholder="Buscar animal, doador ou protocolo..."
              className="bg-transparent outline-none text-sm w-full text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button className="relative p-2 rounded-full hover:bg-muted" aria-label="Notificações">
              <Bell className="size-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-accent" />
            </button>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">Mariana Silva</p>
              <p className="text-xs text-muted-foreground">Administradora</p>
            </div>
            <div className="size-10 rounded-full bg-secondary/20 grid place-items-center font-bold text-secondary">
              MS
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
