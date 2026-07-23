namespace ExpenseControl.Api.DTOs
{
    /// Dados retornados ao consultar uma pessoa.
    public class PessoaDto
    {
        public Guid Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public int Idade { get; set; }
    }
}