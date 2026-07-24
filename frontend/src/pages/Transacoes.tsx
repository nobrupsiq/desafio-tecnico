import { useEffect, useState } from "react";
import TransacaoForm from "../components/TransacaoForm";
import TransacaoList from "../components/TransacaoList";
import { getTransacoes, criarTransacao, getPessoas } from "../services/api";
import type { Transacao, CriarTransacao, Pessoa } from "../types";

/**
 * Página de gerenciamento de transações: cadastro e listagem.
 */
export default function Transacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  const carregarDados = async () => {
    const [transacoesData, pessoasData] = await Promise.all([
      getTransacoes(),
      getPessoas(),
    ]);
    setTransacoes(transacoesData);
    setPessoas(pessoasData);
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleCriar = async (dto: CriarTransacao) => {
    await criarTransacao(dto);
    await carregarDados();
  };

  return (
    <div>
      <h1>Transações</h1>
      <TransacaoForm pessoas={pessoas} onCriar={handleCriar} />
      <TransacaoList transacoes={transacoes} />
    </div>
  );
}
