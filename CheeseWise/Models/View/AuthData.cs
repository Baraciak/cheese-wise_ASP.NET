using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CheeseWise.Models.View
{
    public class AuthData
    {
            public string Token { get; set; }
            public long TokenExpirationTime { get; set; }
            public int Id { get; set; }
    }
}
