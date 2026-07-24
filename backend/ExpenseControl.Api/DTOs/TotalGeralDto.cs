namespace ExpenseControl.Api.DTOs
{
    /// Resposta completa do endpoint de totais: o detalhamento por pessoa
    /// seguido do resumo geral (soma de todas as pessoas).
    public class TotalGeralDto
    {
        public List<TotalPessoaDto> Pessoas { get; set; } = new();

        public decimal TotalGeralReceitas { get; set; }
        public decimal TotalGeralDespesas { get; set; }
        public decimal SaldoGeral { get; set; }
    }
}