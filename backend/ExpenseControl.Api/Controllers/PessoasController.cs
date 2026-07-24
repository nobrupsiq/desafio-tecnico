using ExpenseControl.Api.Data;
using ExpenseControl.Api.DTOs;
using ExpenseControl.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExpenseControl.Api.Controllers
{
    /// <summary>
    /// Endpoints responsáveis pelo cadastro de pessoas:
    /// criação, listagem e deleção (com exclusão em cascata das transações).
    /// </summary>
    [ApiController]
    [Route("pessoas")]
    public class PessoasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PessoasController(AppDbContext context)
        {
            _context = context;
        }

        // GET /pessoas
        // Lista todas as pessoas cadastradas.
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PessoaDto>>> Listar()
        {
            var pessoas = await _context.Pessoas
                .Select(p => new PessoaDto
                {
                    Id = p.Id,
                    Nome = p.Nome,
                    Idade = p.Idade
                })
                .ToListAsync();

            return Ok(pessoas);
        }

        // POST /pessoas
        // Cria uma nova pessoa. O Id é gerado automaticamente no Model.
        [HttpPost]
        public async Task<ActionResult<PessoaDto>> Criar([FromBody] CriarPessoaDto dto)
        {
            // Validação básica de entrada
            if (string.IsNullOrWhiteSpace(dto.Nome))
                return BadRequest("O nome é obrigatório.");

            if (dto.Idade < 0)
                return BadRequest("A idade não pode ser negativa.");

            var pessoa = new Pessoa
            {
                Nome = dto.Nome,
                Idade = dto.Idade
            };

            _context.Pessoas.Add(pessoa);
            await _context.SaveChangesAsync();

            var resultado = new PessoaDto
            {
                Id = pessoa.Id,
                Nome = pessoa.Nome,
                Idade = pessoa.Idade
            };

            return CreatedAtAction(nameof(Listar), new { id = pessoa.Id }, resultado);
        }

        // DELETE /pessoas/{id}
        // Deleta a pessoa. Graças ao Cascade configurado no AppDbContext,
        // todas as transações associadas a ela são apagadas automaticamente.
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletar(Guid id)
        {
            var pessoa = await _context.Pessoas.FindAsync(id);

            if (pessoa is null)
                return NotFound($"Pessoa com id {id} não encontrada.");

            _context.Pessoas.Remove(pessoa);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}