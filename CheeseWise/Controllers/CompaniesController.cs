using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CheeseWise.DB;
using CheeseWise.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace CheeseWise.Controllers
{
    [Route("api/Companies")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly CheeseWiseDbContext _context;

        public CompaniesController(CheeseWiseDbContext context)
        {
            _context = context;
        }

        // GET: api/Companies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompanies()
        {
            var companies = await _context.Companies.ToListAsync();

            return Ok(companies);
        }

        // GET: api/Companies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Company>> GetCompany(int id)
        {
            
            var company = await _context.Companies
                .Where(b => b.Id == id)
                .Include(a => a.Owner)
                .Include(a => a.Category)
                .Include(a => a.Services)
                .SingleOrDefaultAsync();


            if (company == null)
            {
                return NotFound();
            }

            return Ok(company);
        }

        //custom route
        // GET: api/Companies/Category/5
        [HttpGet("Category/{id}")]
        public async Task<List<Company>> GetCompaniesByCategoryId(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            var companies = await _context.Companies
                .Where(b => b.Category.Id== category.Id)
                .ToListAsync();

            return companies;
        }

        //custom route
        // GET: api/Companies/Category/5
        [HttpGet("User/{id}")]
        public async Task<ActionResult<Company>> GetCompanyByUserId(int id)
        {

            var company = await _context.Companies
                .Where(b => b.Owner.Id == id)
                .FirstOrDefaultAsync();

            return Ok(new { company, error = false });
        }

        // PUT: api/Companies/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        [Authorize(policy: JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutCompany(int id, Company company)
        {
            if (id != company.Id)
            {
                return BadRequest();
            }


//            _context.Entry(company).State = EntityState.Modified;
            var entityCompany = _context.Companies
                                        .Include(c => c.Category)
                                        .Include(c => c.Owner)
//                                        .Include(c => c.Services)
                                        .FirstOrDefault(c => c.Id == id);

            if (entityCompany == null)
            {
                return NotFound(new { text = "Company with this id not found" });
            }

            var category = _context.Categories.FirstOrDefault(c => c.Id == company.Category.Id);
            if (category == null)
            {
                return NotFound(new {text = "Category with this id not found" });
            }

            entityCompany.Category = category;
            entityCompany.Name = company.Name;
            entityCompany.Website = company.Website;
            entityCompany.Email = company.Email;
            entityCompany.Phone = company.Phone;
            entityCompany.Location = company.Location;
            entityCompany.Description = company.Description;
            entityCompany.Services = company.Services;


            _context.Companies.Update(entityCompany);


//            _context.Services.Remove(company);
//            await _context.SaveChangesAsync();

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(id))
                {
                    return NotFound();
                }

                throw;
            }

            return CreatedAtAction(nameof(GetCompany), new { id = company.Id }, entityCompany);
        }

        // POST: api/Companies
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Authorize(policy: JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Company>> PostCompany(Company company)
        {
            company.Owner = await _context.Users.FirstOrDefaultAsync(u => u.Id == company.Owner.Id);
            company.Category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == company.Category.Id);
            
            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompany", new {id = company.Id}, company);
        }

        // DELETE: api/Companies/5
        [HttpDelete("{id}")]
        [Authorize(policy: JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Company>> DeleteCompany(int id)
        {
            //including services for cascade delete
            var company =  _context.Companies
                            .Include(c => c.Services)
                            .FirstOrDefault(c => c.Id == id);

            if (company == null)
            {
                return NotFound();
            }

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();

            return company;
        }

        private bool CompanyExists(int id)
        {
            return _context.Companies.Any(e => e.Id == id);
        }
    }
}