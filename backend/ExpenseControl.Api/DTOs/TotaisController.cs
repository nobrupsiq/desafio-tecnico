using ExpenseControl.Api.Data;
using ExpenseControl.Api.DTOs;
using ExpenseControl.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExpenseControl.Api.Controllers
{
    /// Endpoint responsável por consolidar os totais financeiros:
    /// receitas, despesas e saldo de cada pessoa, além do total geral.
    [ApiController]
    [Route("totais")]
    public class TotaisController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TotaisController(AppDbContext context)
        {
            _context = context;
        }

        // GET /totais
        // Retorna, para cada pessoa cadastrada, o total de receitas, despesas
        // e o saldo. Ao final, retorna também o total geral somando todas as pessoas.
        [HttpGet]
        public async Task<ActionResult<TotalGeralDto>> ObterTotais()
        {
            var pessoas = await _context.Pessoas
                .Include(p => p.Transacoes)
                .ToListAsync();

            var totaisPorPessoa = pessoas.Select(p =>
            {
                decimal totalReceitas = p.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Receita)
                    .Sum(t => t.Valor);

                decimal totalDespesas = p.Transacoes
                    .Where(t => t.Tipo == TipoTransacao.Despesa)
                    .Sum(t => t.Valor);

                return new TotalPessoaDto
                {
                    PessoaId = p.Id,
                    Nome = p.Nome,
                    TotalReceitas = totalReceitas,
                    TotalDespesas = totalDespesas,
                    Saldo = totalReceitas - totalDespesas
                };
            }).ToList();

            var resultado = new TotalGeralDto
            {
                Pessoas = totaisPorPessoa,
                TotalGeralReceitas = totaisPorPessoa.Sum(t => t.TotalReceitas),
                TotalGeralDespesas = totaisPorPessoa.Sum(t => t.TotalDespesas),
                SaldoGeral = totaisPorPessoa.Sum(t => t.Saldo)
            };

            return Ok(resultado);
        }
    }
}