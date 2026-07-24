import type { Pessoa } from "../types";

interface PessoaListProps {
  pessoas: Pessoa[];
  onDeletar: (id: string) => Promise<void>;
}

/**
 * Lista as pessoas cadastradas, com botão para deletar cada uma.
 * Ao deletar, o backend também remove as transações associadas (cascade).
 */
export default function PessoaList({ pessoas, onDeletar }: PessoaListProps) {
  if (pessoas.length === 0) {
    return <p>Nenhuma pessoa cadastrada ainda.</p>;
  }

  return (
    <table border={1} cellPadding={8}>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Idade</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {pessoas.map((pessoa) => (
          <tr key={pessoa.id}>
            <td>{pessoa.nome}</td>
            <td>{pessoa.idade}</td>
            <td>
              <button onClick={() => onDeletar(pessoa.id)}>Deletar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
