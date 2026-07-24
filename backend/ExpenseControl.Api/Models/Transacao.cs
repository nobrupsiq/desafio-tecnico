namespace ExpenseControl.Api.Models
{
    public enum TipoTransacao
    {
        Despesa,
        Receita
    }

    public class Transacao
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Descricao { get; set; } = string.Empty;

        public decimal Valor { get; set; }

        public TipoTransacao Tipo { get; set; }

        // id da pessoa dona dessa transação
        public Guid PessoaId { get; set; }

        // Propriedade para navegação
        public Pessoa? Pessoa { get; set; }
    }
}