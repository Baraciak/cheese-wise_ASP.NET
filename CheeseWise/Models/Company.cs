using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CheeseWise.Models
{
    public class Company: BaseModel
    {
        public User Owner { get; set; }
        public Category Category { get; set; }
        public List<Service> Services { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Description { get; set; }
        public float Rating { get; set; }
        public string Location { get; set; }
        public string Website { get; set; }
    }
}
