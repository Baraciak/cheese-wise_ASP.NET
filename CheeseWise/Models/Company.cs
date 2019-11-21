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
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Description { get; set; }
        public float Rating { get; set; }
        public string Location { get; set; }

        public Company() { }
        public Company(string name, string email, string phone, string description,
        float rating, string location, User owner, Category category)
        {
            this.Name = name;
            this.Email= email;
            this.Phone = phone;
            this.Description = description;
            this.Rating = rating;
            this.Location = location;
            this.Owner = owner;
            this.Category = category;
        }
    }
}
