using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CheeseWise.Models
{
    public class Category: BaseModel
    {
        public string ImageSource { get; set; }

        public Category() { }
        public Category(string name, string imageSource)
        {
            this.Name = name;
            this.ImageSource = imageSource;
        }


    }
}
