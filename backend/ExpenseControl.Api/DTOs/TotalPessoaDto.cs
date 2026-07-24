namespace ExpenseControl.Api.DTOs
{
    /// Representa o resumo financeiro de uma pessoa: total de receitas,
    /// total de despesas e o saldo (receitas - despesas).
    public class TotalPessoaDto
    {
        public Guid PessoaId { get; set; }
        public string Nome { get; set; } = string.Empty;
        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }
        public decimal Saldo { get; set; }
    }
}