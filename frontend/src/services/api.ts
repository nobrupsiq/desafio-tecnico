// rascunho
// funções getPessoas(), criarPessoa(), deletarPessoa()
// getTransacoes(), criarTransacao(), getTotais()
import axios from "axios";
import type {
  Pessoa,
  CriarPessoa,
  Transacao,
  CriarTransacao,
  TotalGeral,
} from "../types";

// Ajuste essa URL se sua API estiver rodando em outra porta
const API_URL = "http://localhost:5148";

const api = axios.create({
  baseURL: API_URL,
});

// pessoas
export const getPessoas = async (): Promise<Pessoa[]> => {
  const response = await api.get<Pessoa[]>("/pessoas");
  return response.data;
};

export const criarPessoa = async (dto: CriarPessoa): Promise<Pessoa> => {
  const response = await api.post<Pessoa>("/pessoas", dto);
  return response.data;
};

export const deletarPessoa = async (id: string): Promise<void> => {
  await api.delete(`/pessoas/${id}`);
};

// transações
export const getTransacoes = async (): Promise<Transacao[]> => {
  const response = await api.get<Transacao[]>("/transacoes");
  return response.data;
};

export const criarTransacao = async (
  dto: CriarTransacao,
): Promise<Transacao> => {
  const response = await api.post<Transacao>("/transacoes", dto);
  return response.data;
};

// totais
export const getTotais = async (): Promise<TotalGeral> => {
  const response = await api.get<TotalGeral>("/totais");
  return response.data;
};

export default api;
