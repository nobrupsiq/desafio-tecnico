using ExpenseControl.Api.Data;
using ExpenseControl.Api.DTOs;
using ExpenseControl.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExpenseControl.Api.Controllers
{
  
    /// endpoints responsaveis pelo cadastro de transações financeiras:
    /// criação e listagem. Não há edição ou deleção (fora do escopo do teste).
    [ApiController]
    [Route("transacoes")]
    public class TransacoesController : ControllerBase
    {
        private readonly AppDbContext _context;

        // idade a partir da qual a pessoa é considerada maior de idade.
        // extraido como constante para deixar a regra de negocio explicita e fácil de localizar.
        private const int IDADE_MAIOR_DE_IDADE = 18;

        public TransacoesController(AppDbContext context)
        {
            _context = context;
        }

        // GET /transacoes
        // Lista todas as transações cadastradas, incluindo o nome da pessoa associada.
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransacaoDto>>> Listar()
        {
            var transacoes = await _context.Transacoes
                .Include(t => t.Pessoa) // traz os dados da pessoa junto (JOIN)
                .Select(t => new TransacaoDto
                {
                    Id = t.Id,
                    Descricao = t.Descricao,
                    Valor = t.Valor,
                    Tipo = t.Tipo,
                    PessoaId = t.PessoaId,
                    PessoaNome = t.Pessoa!.Nome
                })
                .ToListAsync();

            return Ok(transacoes);
        }

        // POST /transacoes
        // Cria uma nova transação, validando:
        // 1. Se a pessoa informada existe.
        // 2. Se a pessoa é menor de idade, permite cadastrar apenas Despesas (nunca Receitas).
        [HttpPost]
        public async Task<ActionResult<TransacaoDto>> Criar([FromBody] CriarTransacaoDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Descricao))
                return BadRequest("A descrição é obrigatória.");

            if (dto.Valor <= 0)
                return BadRequest("O valor deve ser maior que zero.");

            // a pessoa informada precisa existir no cadastro.
            var pessoa = await _context.Pessoas.FindAsync(dto.PessoaId);
            if (pessoa is null)
                return NotFound($"Pessoa com id {dto.PessoaId} não encontrada.");

            // pessoas menores de 18 anos só podem ter transações do tipo Despesa.
            bool pessoaEhMenorDeIdade = pessoa.Idade < IDADE_MAIOR_DE_IDADE;
            if (pessoaEhMenorDeIdade && dto.Tipo == TipoTransacao.Receita)
            {
                return BadRequest(
                    "Pessoas menores de idade não podem cadastrar transações do tipo Receita, apenas Despesa.");
            }

            var transacao = new Transacao
            {
                Descricao = dto.Descricao,
                Valor = dto.Valor,
                Tipo = dto.Tipo,
                PessoaId = dto.PessoaId
            };

            _context.Transacoes.Add(transacao);
            await _context.SaveChangesAsync();

            var resultado = new TransacaoDto
            {
                Id = transacao.Id,
                Descricao = transacao.Descricao,
                Valor = transacao.Valor,
                Tipo = transacao.Tipo,
                PessoaId = transacao.PessoaId,
                PessoaNome = pessoa.Nome
            };

            return CreatedAtAction(nameof(Listar), new { id = transacao.Id }, resultado);
        }
    }
}