using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CheeseWise.Models.View
{
    public class ServiceViewModel:BaseModel
    {
        public string Description { get; set; }
        public string PriceCategory { get; set; }
        public int Price { get; set; }
        public int CompanyId { get; set; }
    }
}
