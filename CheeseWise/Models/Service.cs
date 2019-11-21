using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CheeseWise.Models
{
    public class Service: BaseModel
    {
        public Company Company { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public string PriceCategory { get; set; }

        public Service() { }

        public Service(string name, string description, double price, string priceCategory, Company company)
        {
            this.Name = name;
            this.Description = description;
            this.Price = price;
            this.PriceCategory = priceCategory;
            this.Company = company;
        }
    }
}
