﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CheeseWise.Models
{
    public abstract class BaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

    }
}
