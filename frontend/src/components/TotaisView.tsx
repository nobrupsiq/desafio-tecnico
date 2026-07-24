import type { TotalGeral } from "../types";

interface TotaisViewProps {
  totais: TotalGeral;
}

const formatarMoeda = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/**
 * Exibe o resumo financeiro: totais por pessoa (receitas, despesas, saldo)
 * e o total geral consolidado no final.
 */
export default function TotaisView({ totais }: TotaisViewProps) {
  if (totais.pessoas.length === 0) {
    return <p>Nenhuma pessoa cadastrada ainda.</p>;
  }

  return (
    <table border={1} cellPadding={8}>
      <thead>
        <tr>
          <th>Pessoa</th>
          <th>Receitas</th>
          <th>Despesas</th>
          <th>Saldo</th>
        </tr>
      </thead>
      <tbody>
        {totais.pessoas.map((p) => (
          <tr key={p.pessoaId}>
            <td>{p.nome}</td>
            <td style={{ color: "green" }}>{formatarMoeda(p.totalReceitas)}</td>
            <td style={{ color: "red" }}>{formatarMoeda(p.totalDespesas)}</td>
            <td style={{ color: p.saldo >= 0 ? "green" : "red" }}>
              {formatarMoeda(p.saldo)}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr style={{ fontWeight: "bold" }}>
          <td>TOTAL GERAL</td>
          <td style={{ color: "green" }}>
            {formatarMoeda(totais.totalGeralReceitas)}
          </td>
          <td style={{ color: "red" }}>
            {formatarMoeda(totais.totalGeralDespesas)}
          </td>
          <td style={{ color: totais.saldoGeral >= 0 ? "green" : "red" }}>
            {formatarMoeda(totais.saldoGeral)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
