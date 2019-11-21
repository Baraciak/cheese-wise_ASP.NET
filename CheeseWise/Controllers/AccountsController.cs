using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CheeseWise.DB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CheeseWise.Models;
using Microsoft.AspNetCore.Session;
using Microsoft.EntityFrameworkCore;

namespace CheeseWise.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {

        private readonly CheeseWiseDbContext _context;

        public AccountsController(CheeseWiseDbContext context)
        {
            _context = context;
        }

        // POST: api/Accounts/Login
        [HttpPost("Login")]
        public async Task<ActionResult<Account>> Login(Account acc)
        {

            var account = await _context.Accounts.Where(a => a.Email == acc.Email)
                                           .Include(u => u.Owner)
                                           .SingleOrDefaultAsync();

            if (account == null)
            {
                return NotFound();
            }

            return Ok(account.Owner);
        }

        // POST: api/Accounts/Register
        [HttpPost("Register")]
        public async Task<ActionResult<Account>> Register(Account accData)
        {
            var account = accData;
            var user = account.Owner;

            _context.Users.Add(user);

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}