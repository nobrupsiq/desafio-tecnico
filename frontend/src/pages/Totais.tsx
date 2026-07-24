import { useEffect, useState } from "react";
import TotaisView from "../components/TotaisView";
import { getTotais } from "../services/api";
import type { TotalGeral } from "../types";

/**
 * Página de consulta de totais: receitas, despesas e saldo por pessoa,
 * além do total geral consolidado.
 */
export default function Totais() {
  const [totais, setTotais] = useState<TotalGeral | null>(null);

  useEffect(() => {
    getTotais().then(setTotais);
  }, []);

  if (!totais) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Totais</h1>
      <TotaisView totais={totais} />
    </div>
  );
}
