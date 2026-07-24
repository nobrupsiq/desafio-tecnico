import { useState } from "react";
import { TipoTransacao } from "../types";
import type { CriarTransacao, Pessoa } from "../types";

interface TransacaoFormProps {
  pessoas: Pessoa[];
  onCriar: (dto: CriarTransacao) => Promise<void>;
}

/**
 * Formulário de cadastro de transação.
 * Regra de negócio refletida na UI: se a pessoa selecionada for menor de
 * idade (< 18 anos), a opção "Receita" fica desabilitada, permitindo
 * apenas "Despesa". O backend também valida essa regra de forma independente.
 */
export default function TransacaoForm({ pessoas, onCriar }: TransacaoFormProps) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState<TipoTransacao>(TipoTransacao.Despesa);
  const [pessoaId, setPessoaId] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const pessoaSelecionada = pessoas.find((p) => p.id === pessoaId);
  const pessoaEhMenorDeIdade = pessoaSelecionada ? pessoaSelecionada.idade < 18 : false;

  const handlePessoaChange = (id: string) => {
    setPessoaId(id);
    const pessoa = pessoas.find((p) => p.id === id);
    // Se trocar para uma pessoa menor de idade e o tipo atual for Receita,
    // força a volta para Despesa automaticamente.
    if (pessoa && pessoa.idade < 18 && tipo === TipoTransacao.Receita) {
      setTipo(TipoTransacao.Despesa);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (!descricao.trim()) {
      setErro("A descrição é obrigatória.");
      return;
    }

    const valorNumero = Number(valor);
    if (isNaN(valorNumero) || valorNumero <= 0) {
      setErro("Informe um valor válido, maior que zero.");
      return;
    }

    if (!pessoaId) {
      setErro("Selecione uma pessoa.");
      return;
    }

    try {
      setCarregando(true);
      await onCriar({
        descricao: descricao.trim(),
        valor: valorNumero,
        tipo,
        pessoaId,
      });
      setDescricao("");
      setValor("");
      setTipo(TipoTransacao.Despesa);
      setPessoaId("");
    } catch (err) {
      setErro("Erro ao cadastrar transação. Tente novamente.");
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Transação</h2>

      <div>
        <label htmlFor="pessoa">Pessoa</label>
        <select
          id="pessoa"
          value={pessoaId}
          onChange={(e) => handlePessoaChange(e.target.value)}
        >
          <option value="">Selecione...</option>
          {pessoas.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome} ({p.idade} anos)
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="descricao">Descrição</label>
        <input
          id="descricao"
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Ex: Supermercado"
        />
      </div>

      <div>
        <label htmlFor="valor">Valor</label>
        <input
          id="valor"
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="0.00"
          min={0}
          step="0.01"
        />
      </div>

      <div>
        <label htmlFor="tipo">Tipo</label>
        <select
          id="tipo"
          value={tipo}
          onChange={(e) => setTipo(Number(e.target.value) as TipoTransacao)}
        >
          <option value={TipoTransacao.Despesa}>Despesa</option>
          <option value={TipoTransacao.Receita} disabled={pessoaEhMenorDeIdade}>
            Receita
          </option>
        </select>
        {pessoaEhMenorDeIdade && (
          <p style={{ color: "orange" }}>
            Pessoa menor de idade: apenas despesas são permitidas.
          </p>
        )}
      </div>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <button type="submit" disabled={carregando}>
        {carregando ? "Salvando..." : "Cadastrar"}
      </button>
    </form>
  );
}
