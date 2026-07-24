import { TipoTransacao } from "../types";
import type { Transacao } from "../types";

interface TransacaoListProps {
  transacoes: Transacao[];
}

/**
 * Lista as transações cadastradas (somente leitura — não há edição/deleção).
 */
export default function TransacaoList({ transacoes }: TransacaoListProps) {
  if (transacoes.length === 0) {
    return <p>Nenhuma transação cadastrada ainda.</p>;
  }

  return (
    <table border={1} cellPadding={8}>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Valor</th>
          <th>Tipo</th>
          <th>Pessoa</th>
        </tr>
      </thead>
      <tbody>
        {transacoes.map((t) => (
          <tr key={t.id}>
            <td>{t.descricao}</td>
            <td>
              {t.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </td>
            <td style={{ color: t.tipo === TipoTransacao.Receita ? "green" : "red" }}>
              {t.tipo === TipoTransacao.Receita ? "Receita" : "Despesa"}
            </td>
            <td>{t.pessoaNome}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
