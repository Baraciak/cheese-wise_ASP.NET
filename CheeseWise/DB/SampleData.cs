using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CheeseWise.Models;
using Microsoft.Extensions.Configuration;

namespace CheeseWise.DB
{
    public class SampleData
    {
        public static List<User> Users = new List<User>
        {
            new User("Smog", "Wawelski", "smok.wawelski@smog.com"),
            new User("Test", "Testowski", "test@testing.com")
        };

        public static List<Category> Categories = new List<Category>
        {
            new Category("House Cleaning", "https://img.icons8.com/cotton/80/000000/polish.png"),
            new Category("Plumbing", "https://img.icons8.com/cotton/80/000000/plumbing--v2.png"),
            new Category("Gardening", "https://img.icons8.com/cotton/64/000000/hand-planting--v1.png"),
            new Category("Constructing", "https://img.icons8.com/cotton/64/000000/drill.png"),
            new Category("Designing", "https://img.icons8.com/plasticine/100/000000/design--v2.png"),
            new Category("Sewing", "https://img.icons8.com/cotton/64/000000/button--v2.png"),
            new Category("IT Support", "https://img.icons8.com/cotton/64/000000/monitor.png"),
            new Category("Security", "https://img.icons8.com/cotton/64/000000/wallmount-camera.png"),
            new Category("Health", "https://img.icons8.com/cotton/64/000000/hand-with-a-pill.png")
        };

        public static List<Company> Companies = new List<Company>
        {
            new Company("Cleaning Company 1", "cleaning1@gmail.com", "420-420-420",
                "Company 1 for testing purposes", 4.2f, "Berlin", Users[0], Categories[0]),
            new Company("Cleaning Company 2", "cleaning2@gmail.com", "420-420-420",
                "Company 2 for testing purposes", 4.5f, "Warsaw", Users[1], Categories[0])
        };

        public static List<Service> Services = new List<Service>
        {
            new Service("HouseCleaning", "Cleaning house for money bitch", 420, "day", Companies[0]),
            new Service("HouseCleaning 2", "Cleaning house for money bitch", 69, "hour", Companies[0])
        };

    }
}
