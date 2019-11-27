using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CheeseWise.DB;
using CheeseWise.Models;
using CheeseWise.Models.View;
using CheeseWise.Services.Abstraction;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CheeseWise.Controllers 
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        IAuthService authService;
        private readonly CheeseWiseDbContext _context;

        public AuthController(IAuthService authService, CheeseWiseDbContext context)
        {
            this.authService = authService;
            this._context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthData>> Login([FromBody] LoginViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var account = _context.Accounts
                .Include(acc => acc.Owner)
                .SingleOrDefault(acc => acc.Email == model.Email);

            if (account == null)
            {
                return BadRequest(new {email = "no user with this email"});
            }

            var passwordValid = authService.VerifyPassword(model.Password, account.Password);
            if (!passwordValid)
            {
                return BadRequest(new {password = "invalid password"});
            }

            return Ok(authService.GetAuthData(account.Owner.Id));
        }

        [HttpPost("register")]
        public ActionResult<AuthData> RegisterUser([FromBody] RegisterViewModel model)
        {
//            if (!ModelState.IsValid) return BadRequest(ModelState);

            var emailUniq = _context.Accounts.SingleOrDefault(acc => acc.Email == model.Email);
            if (emailUniq != null) return BadRequest(new {email = "user with this email already exists"});

//            var id = Guid.NewGuid();
            var user = new User
            {
                Name = model.Name,
                Surname = model.Surname,
                Email = model.Email,

            };
            var account = new Account
            {
                Owner = user,
                Email = model.Email,
                Password = authService.HashPassword(model.Password)
            };

            _context.Users.Add(user);
            _context.Accounts.Add(account);
            _context.SaveChanges();
//
//            var id = account.Id;
//            return authService.GetAuthData(id)
            return Ok();
        }

        [HttpPost("validate-token")]
        public ActionResult<AuthData> GetUserByToken([FromBody] AuthData authData)
        {
            if (authData.Token == null) return BadRequest(new { token = "no token specified"});
            
            string token = authData.Token;
            int userId = authService.DecodeToken(token);

            var user = _context.Users.SingleOrDefaultAsync(u => u.Id == userId);


            return Ok(user.Result);
        }

    }
}