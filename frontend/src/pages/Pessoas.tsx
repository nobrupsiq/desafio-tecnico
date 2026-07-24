import { useEffect, useState } from "react";
import PessoaForm from "../components/PessoaForm";
import PessoaList from "../components/PessoaList";
import { getPessoas, criarPessoa, deletarPessoa } from "../services/api";
import type { Pessoa, CriarPessoa } from "../types";

/**
 * Página de gerenciamento de pessoas: cadastro, listagem e deleção.
 */
export default function Pessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  const carregarPessoas = async () => {
    const dados = await getPessoas();
    setPessoas(dados);
  };

  useEffect(() => {
    carregarPessoas();
  }, []);

  const handleCriar = async (dto: CriarPessoa) => {
    await criarPessoa(dto);
    await carregarPessoas();
  };

  const handleDeletar = async (id: string) => {
    await deletarPessoa(id);
    await carregarPessoas();
  };

  return (
    <div>
      <h1>Pessoas</h1>
      <PessoaForm onCriar={handleCriar} />
      <PessoaList pessoas={pessoas} onDeletar={handleDeletar} />
    </div>
  );
}
