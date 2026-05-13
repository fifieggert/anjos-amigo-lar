import thor from "@/assets/animal-thor.jpg";
import luna from "@/assets/animal-luna.jpg";
import pipoca from "@/assets/animal-pipoca.jpg";
import max from "@/assets/animal-max.jpg";
import mel from "@/assets/animal-mel.jpg";
import bella from "@/assets/animal-bella.jpg";

export type AnimalStatus = "Disponível" | "Adotado" | "Em tratamento" | "Em espera";
export type Animal = {
  id: string;
  nome: string;
  especie: "Cão" | "Gato";
  raca: string;
  idade: string;
  porte: "Pequeno" | "Médio" | "Grande";
  status: AnimalStatus;
  foto: string;
  descricao: string;
  vacinado: boolean;
  castrado: boolean;
};

export const animais: Animal[] = [
  { id: "ANJ-081", nome: "Thor", especie: "Cão", raca: "Golden Retriever", idade: "4 meses", porte: "Grande", status: "Disponível", foto: thor, descricao: "Filhote brincalhão, adora correr no quintal e fazer carinho.", vacinado: true, castrado: false },
  { id: "ANJ-072", nome: "Luna", especie: "Gato", raca: "SRD Tigrada", idade: "2 anos", porte: "Pequeno", status: "Em tratamento", foto: luna, descricao: "Em recuperação de uma cirurgia simples. Muito dócil.", vacinado: true, castrado: true },
  { id: "ANJ-094", nome: "Pipoca", especie: "Cão", raca: "Vira-lata Caramelo", idade: "2 anos", porte: "Médio", status: "Disponível", foto: pipoca, descricao: "Sociável, amigo de outros cães e ótimo com crianças.", vacinado: true, castrado: true },
  { id: "ANJ-101", nome: "Max", especie: "Cão", raca: "SRD", idade: "3 meses", porte: "Pequeno", status: "Em espera", foto: max, descricao: "Resgatado da rua, aguardando avaliação veterinária.", vacinado: false, castrado: false },
  { id: "ANJ-066", nome: "Mel", especie: "Gato", raca: "Laranja SRD", idade: "1 ano", porte: "Pequeno", status: "Disponível", foto: mel, descricao: "Carinhosa, ronrona muito. Adora colo e janelas.", vacinado: true, castrado: true },
  { id: "ANJ-058", nome: "Bella", especie: "Cão", raca: "Spitz Alemão", idade: "5 anos", porte: "Pequeno", status: "Adotado", foto: bella, descricao: "Adotada por uma família amorosa em outubro.", vacinado: true, castrado: true },
];

export type Doacao = {
  id: string;
  item: string;
  categoria: "Ração" | "Limpeza" | "Brinquedos" | "Medicamento";
  quantidade: number;
  unidade: string;
  minimo: number;
  data: string;
  doador: string;
};

export const doacoes: Doacao[] = [
  { id: "D-301", item: "Ração Cães Adulto Premium", categoria: "Ração", quantidade: 120, unidade: "kg", minimo: 50, data: "12/05/2026", doador: "Mercado Bom Preço" },
  { id: "D-302", item: "Ração Filhote Puppy", categoria: "Ração", quantidade: 5, unidade: "kg", minimo: 30, data: "08/05/2026", doador: "Roberto Almeida" },
  { id: "D-303", item: "Detergente Neutro", categoria: "Limpeza", quantidade: 24, unidade: "un", minimo: 10, data: "10/05/2026", doador: "Anônimo" },
  { id: "D-304", item: "Tapetes Higiênicos", categoria: "Limpeza", quantidade: 12, unidade: "pct", minimo: 20, data: "11/05/2026", doador: "Pet Shop Patinhas" },
  { id: "D-305", item: "Brinquedos de Corda", categoria: "Brinquedos", quantidade: 18, unidade: "un", minimo: 5, data: "07/05/2026", doador: "Carla Pires" },
  { id: "D-306", item: "Antipulgas Nexgard", categoria: "Medicamento", quantidade: 4, unidade: "un", minimo: 10, data: "05/05/2026", doador: "Clínica VetVida" },
];

export type Adocao = {
  id: string;
  interessado: string;
  animal: string;
  telefone: string;
  email: string;
  status: "Pendente" | "Em análise" | "Aprovado" | "Recusado";
  data: string;
};

export const adocoes: Adocao[] = [
  { id: "A-501", interessado: "Ricardo Mendes", animal: "Thor", telefone: "(11) 98765-4321", email: "ricardo@email.com", status: "Pendente", data: "13/05/2026" },
  { id: "A-502", interessado: "Ana Silva", animal: "Pipoca", telefone: "(11) 91234-5678", email: "ana.silva@email.com", status: "Em análise", data: "12/05/2026" },
  { id: "A-503", interessado: "Carlos Souza", animal: "Mel", telefone: "(21) 99999-1111", email: "carlos.s@email.com", status: "Aprovado", data: "10/05/2026" },
  { id: "A-504", interessado: "Juliana Costa", animal: "Luna", telefone: "(11) 95555-2222", email: "ju.costa@email.com", status: "Pendente", data: "13/05/2026" },
];

export const adocoesMensais = [
  { mes: "Jan", adocoes: 8 },
  { mes: "Fev", adocoes: 11 },
  { mes: "Mar", adocoes: 14 },
  { mes: "Abr", adocoes: 9 },
  { mes: "Mai", adocoes: 18 },
];

export const especiePorStatus = [
  { especie: "Cães", disponiveis: 24, tratamento: 4 },
  { especie: "Gatos", disponiveis: 18, tratamento: 2 },
];
