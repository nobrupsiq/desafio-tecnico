using ExpenseControl.Api.Models;

namespace ExpenseControl.Api.DTOs
{
    /// Dados retornados ao consultar uma transação.
    public class TransacaoDto
    {
        public Guid Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public TipoTransacao Tipo { get; set; }
        public Guid PessoaId { get; set; }
        public string PessoaNome { get; set; } = string.Empty;
    }
}