using System.Linq;
using CheeseWise.DB;
using CheeseWise.Models;
using CheeseWise.Models.View;
using CheeseWise.Services.Abstraction;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CheeseWise.Controllers 
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly CheeseWiseDbContext _context;

        public AuthController(IAuthService authService, CheeseWiseDbContext context)
        {
            _authService = authService;
            _context = context;
        }



        [HttpPost("login")]
        public ActionResult<AuthData> Login([FromBody] LoginViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var account = _context.Accounts
                .Include(acc => acc.Owner)
                .SingleOrDefault(acc => acc.Email == model.Email);

            if (account == null)
                return NotFound(new {message = "Email or Password is Wrong"});

            var passwordValid = _authService.VerifyPassword(model.Password, account.Password);
            if (!passwordValid)
            {
                return NotFound(new { message = "Email or Password is Wrong" });
            }

            //if user is company owner 
            var userCompany = _context.Companies.SingleOrDefaultAsync(c => c.Owner.Id == account.Owner.Id).Result;
            var hasCompany = userCompany != null;
            var token = _authService.GetToken(account.Owner, hasCompany);

            return Ok(new { token, account.Owner, hasCompany });
        }



        [HttpPost("register")]
        public ActionResult<AuthData> RegisterUser([FromBody] RegisterViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var emailUniq = _context.Accounts.SingleOrDefault(acc => acc.Email == model.Email);
            if (emailUniq != null) return BadRequest(new {email = "user with this email already exists"});

            var user = new User
            {
                Name = model.Name,
                Surname = model.Surname,
                Email = model.Email

            };
            var account = new Account
            {
                Owner = user,
                Email = model.Email,
                Password = _authService.HashPassword(model.Password)
            };

            _context.Users.Add(user);
            _context.Accounts.Add(account);
            _context.SaveChanges();

            return Ok();
        }

        [Authorize(policy: JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("refresh-token")]
        public ActionResult<AuthData> RefreshToken([FromBody]string oldToken)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userId = _authService.GetUserIdFromToken(oldToken);

            //if user is company owner 
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);
            var userCompany = _context.Companies.FirstOrDefaultAsync(c => c.Owner.Id == userId).Result;
            var hasCompany = userCompany != null;
            var token = _authService.GetToken(user, hasCompany);

            return Ok(new { token });
        }
    }
}