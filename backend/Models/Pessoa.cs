namespace ExpenseControl.Api.Models
{
   /// <summary>
  /// </summary>

  public class Pessoa
  {
    public Guild Id {get; set;} = Guild.NewGuild();
    public string Nome {get; set;} = string.Empty;
    public int Idade {get; set;}

    // Uma pessoa pode ter várias transações associadas.
    // Essa lista é usada pelo EF Core para o relacionamento 1:N.

    public List<Transacao> Transacaos {get; set;} = new();
  }
}