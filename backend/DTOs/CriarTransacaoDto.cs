using ExpenseControl.Api.Models;

namespace ExpenseControl.Api.DTOs
{
    /// Dados recebidos para cadastrar uma nova transação.
    public class CriarTransacaoDto
    {
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public TipoTransacao Tipo { get; set; }
        public Guid PessoaId { get; set; }
    }
}