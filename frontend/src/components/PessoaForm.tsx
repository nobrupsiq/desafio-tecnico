import { useState } from "react";
import type { CriarPessoa } from "../types";

interface PessoaFormProps {
  onCriar: (dto: CriarPessoa) => Promise<void>;
}

/**
 * Formulário de cadastro de pessoa.
 * Envia nome e idade; o backend gera o Id automaticamente.
 */
export default function PessoaForm({ onCriar }: PessoaFormProps) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (!nome.trim()) {
      setErro("O nome é obrigatório.");
      return;
    }

    const idadeNumero = Number(idade);
    if (isNaN(idadeNumero) || idadeNumero < 0) {
      setErro("Informe uma idade válida.");
      return;
    }

    try {
      setCarregando(true);
      await onCriar({ nome: nome.trim(), idade: idadeNumero });
      setNome("");
      setIdade("");
    } catch (err) {
      setErro("Erro ao cadastrar pessoa. Tente novamente.");
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Pessoa</h2>

      <div>
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome da pessoa"
        />
      </div>

      <div>
        <label htmlFor="idade">Idade</label>
        <input
          id="idade"
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Idade"
          min={0}
        />
      </div>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <button type="submit" disabled={carregando}>
        {carregando ? "Salvando..." : "Cadastrar"}
      </button>
    </form>
  );
}
