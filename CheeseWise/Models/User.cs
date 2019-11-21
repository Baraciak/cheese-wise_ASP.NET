using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CheeseWise.Models
{
    public class User : BaseModel
    {
        public string Surname { get; set; }
        public string Email { get; set; }

        public User() { }

        public User(string name, string surname, string email)
        {
            this.Name = name;
            this.Surname = surname;
            this.Email = email;
        }
    }
}
