using System;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using CheeseWise.Models.View;
using CheeseWise.Services.Abstraction;
using CryptoHelper;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Microsoft.IdentityModel.Tokens;

namespace CheeseWise.Services
{
    public class AuthService: IAuthService
    {
        private readonly string _jwtSecret;
        private readonly int _jwtLifespan;
        public AuthService(string jwtSecret, int jwtLifespan)
        {
            this._jwtSecret = jwtSecret;
            this._jwtLifespan = jwtLifespan;
        }

        public AuthData GetAuthData(int id)
        {
            var expirationTime = DateTime.UtcNow.AddSeconds(_jwtLifespan);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, Convert.ToString(id))
                }),
                Expires = expirationTime,
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret)),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));

            return new AuthData
            {
                Token = token,
                TokenExpirationTime = ((DateTimeOffset)expirationTime).ToUnixTimeSeconds(),
                Id = id
            };
        }

        public string HashPassword(string password)
        {
            return Crypto.HashPassword(password);
        }

        public bool VerifyPassword(string actualPassword, string hashedPassword)
        {
            return Crypto.VerifyHashedPassword(hashedPassword, actualPassword);
        }


        public int DecodeToken(string jwtToken)
        {
            var handler = new JwtSecurityTokenHandler();
            var decodedToken = handler.ReadJwtToken(jwtToken);
            //get userId stored in token
            int userId = Convert.ToInt32(decodedToken.Claims.ToList()[0].Value);

            return userId;
        }
    }
}
