using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Security.Claims;
using System.Text;
using CheeseWise.Services.Abstraction;
using CryptoHelper;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using CheeseWise.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace CheeseWise.Services
{
    public class AuthService: IAuthService
    {
        private readonly string _jwtSecret;
        private readonly int _jwtLifespan;
        private readonly IConfiguration _configuration;
        private readonly TokenValidationParameters _tokenValidationParameters;
        public AuthService(string jwtSecret,
                            int jwtLifespan,
                            IConfiguration configuration,
                            TokenValidationParameters tokenValidationParameters)
        {
            this._jwtSecret = jwtSecret;
            this._jwtLifespan = jwtLifespan;
            this._configuration = configuration;
            this._tokenValidationParameters = tokenValidationParameters;
        }

        public string GetToken(User user, bool hasCompany)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var expirationTime = DateTime.UtcNow.AddMinutes(_jwtLifespan);

            var claims = new List<Claim>
            {
                new Claim("Id", Convert.ToString(user.Id)),
                new Claim("Name", Convert.ToString(user.Name)),
                new Claim("Email", Convert.ToString(user.Email)),
                new Claim("hasCompany", Convert.ToString(hasCompany))
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Site"],
                audience: _configuration["Jwt:Site"],
                expires: expirationTime,
                signingCredentials: credentials,
                claims: claims
            );

            return new JwtSecurityTokenHandler().WriteToken(token);

        }

        public string HashPassword(string password)
        {
            return Crypto.HashPassword(password);
        }

        public bool VerifyPassword(string actualPassword, string hashedPassword)
        {
            return Crypto.VerifyHashedPassword(hashedPassword, actualPassword);
        }


        public int GetUserIdFromToken(string jwtToken)
        {
            var handler = new JwtSecurityTokenHandler();
            var decodedToken = handler.ReadJwtToken(jwtToken);
            //get userId stored in token
            var userId = Convert.ToInt32(decodedToken.Claims.ToList()[0].Value);

            return userId;
        }
    }
}
