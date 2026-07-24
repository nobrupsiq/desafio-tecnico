namespace ExpenseControl.Api.DTOs
{
    /// Dados recebidos para cadastrar uma nova pessoa.
    /// Não inclui o Id, pois ele é gerado automaticamente pelo sistema.
    public class CriarPessoaDto
    {
        public string Nome { get; set; } = string.Empty;
        public int Idade { get; set; }
    }
}