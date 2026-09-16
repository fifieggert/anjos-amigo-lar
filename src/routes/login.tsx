import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PawPrint, Mail, Lock } from "lucide-react";
import logoAsset from "@/assets/logo-anjos.png.asset.json";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — Anjos Protetores" },
      { name: "description", content: "Acesse o sistema de gestão do abrigo Anjos Protetores." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("mariana@anjos.org");
  const [senha, setSenha] = useState("demo1234");

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left visual */}
      <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/10 relative overflow-hidden">
        <div className="flex items-center gap-3 relative z-10">
          <img src={logo} alt="" className="size-10" width={40} height={40} />
          <span className="font-display font-bold text-lg">Anjos Protetores</span>
        </div>
        <div className="relative z-10 max-w-md">
          <PawPrint className="size-10 text-accent mb-4" />
          <h1 className="font-display font-bold text-4xl text-foreground leading-tight">
            Cuidar é um ato de amor.
          </h1>
          <p className="text-muted-foreground mt-3">
            Gerencie animais, doações e adoções do seu abrigo com simplicidade e
            carinho.
          </p>
        </div>
        <p className="text-xs text-muted-foreground relative z-10">
          © 2026 Anjos Protetores · Feito com ♥ no Brasil
        </p>
        {/* decorative blobs */}
        <div className="absolute -top-20 -right-20 size-80 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-10 size-80 bg-accent/20 rounded-full blur-3xl" />
      </div>

      {/* Form */}
      <div className="flex items-center justify-center p-6 lg:p-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/dashboard" });
          }}
          className="w-full max-w-md space-y-6"
        >
          <div className="lg:hidden flex items-center gap-3">
            <img src={logo} alt="" className="size-10" width={40} height={40} />
            <span className="font-display font-bold text-lg">Anjos Protetores</span>
          </div>

          <div>
            <h2 className="font-display font-bold text-3xl">Bem-vinda de volta</h2>
            <p className="text-muted-foreground mt-1">
              Entre com sua conta para continuar.
            </p>
          </div>

          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-foreground">E-mail</span>
              <div className="mt-1 flex items-center bg-muted rounded-2xl px-4 py-3 focus-within:ring-2 ring-primary">
                <Mail className="size-4 text-muted-foreground mr-2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent outline-none w-full text-sm"
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-foreground">Senha</span>
              <div className="mt-1 flex items-center bg-muted rounded-2xl px-4 py-3 focus-within:ring-2 ring-primary">
                <Lock className="size-4 text-muted-foreground mr-2" />
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="bg-transparent outline-none w-full text-sm"
                  required
                />
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" className="rounded" /> Lembrar de mim
            </label>
            <a href="#" className="font-semibold text-primary hover:underline">
              Esqueci minha senha
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-accent text-accent-foreground font-bold shadow-lg shadow-accent/20 hover:bg-accent/90 transition-all active:scale-[0.98]"
          >
            Entrar
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Visitante?{" "}
            <Link to="/publico" className="font-semibold text-primary hover:underline">
              Conheça os animais para adoção
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
