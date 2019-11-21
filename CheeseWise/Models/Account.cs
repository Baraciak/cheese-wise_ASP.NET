using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CheeseWise.Models
{
    public class Account
    {

        public int Id { get; set; }
        public User Owner { get; set; }
//
//        [RegularExpression(@"^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$")]
//        [Required]
        public string Email { get; set; }

//        [RegularExpression(@"^(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,15})$")]
//        [Required]
        public string Password { get; set; }

        public Account() { }

    }
}
