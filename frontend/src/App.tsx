import { useState } from "react";
import Pessoas from "./pages/Pessoas";
import Transacoes from "./pages/Transacoes";
import Totais from "./pages/Totais";
import "./index.css";

type Pagina = "pessoas" | "transacoes" | "totais";

// raiz

function App() {
  const [pagina, setPagina] = useState<Pagina>("pessoas");

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1>Controle de Gastos Residenciais</h1>

      <nav style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <button onClick={() => setPagina("pessoas")}>Pessoas</button>
        <button onClick={() => setPagina("transacoes")}>Transações</button>
        <button onClick={() => setPagina("totais")}>Totais</button>
      </nav>

      {pagina === "pessoas" && <Pessoas />}
      {pagina === "transacoes" && <Transacoes />}
      {pagina === "totais" && <Totais />}
    </div>
  );
}

export default App;
