using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using vizsgabackend.Models;
using VizsgaremekAPI;


namespace vizsgabackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistryController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Registry(Profil profil)
        {
            await using (var context = new NyelvbazisContext())
            {
                try
                {
                    if (context.Profils.FirstOrDefault(u => u.Nev == profil.Nev) != null)
                    {
                        return BadRequest("A felhasználónév már foglalt");
                    }
                    if (context.Profils.FirstOrDefault(u => u.Email == profil.Email) != null)
                    {
                        return BadRequest("Az email cím már foglalt!");
                    }
                    profil.Hash = Program.CreateSHA256(profil.Hash);
                    await context.SaveChangesAsync();
                    return Ok("Sikeres regisztráció!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
    }
}
