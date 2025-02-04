using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistryController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Registry(Profil user)
        {
            using (var context = new NyelvbazisContext())
            {
                try
                {
                    if (context.Profils.FirstOrDefault(u => u.Nev == user.Nev) != null)
                    {
                        return BadRequest("A felhasználónév már foglalt");
                    }
                    if (context.Profils.FirstOrDefault(u => u.Email == user.Email) != null)
                    {
                        return BadRequest("Az email cím már foglalt!");
                    }
                    user.Aktiv = 0;
                    user.Jogosultsag = 0;
                    user.Hash = Program.CreateSHA256(user.Hash);
                    await context.Profils.AddAsync(user);
                    await context.SaveChangesAsync();
                    await Program.SendEmail(user.Email, "Regisztráció", $"A következő linkre kattintva véglegesítse a regisztrációját: \nhttp://localhost:5000/api/Registry?Nev={user.Nev}&email={user.Email}");
                    return Ok("Sikeres regisztráció! Az aktiváláshoz ellenőrizze az email fiókját!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpGet]
        public async Task<IActionResult> Activate(string felhasznaloNev, string email)
        {
            using (var context = new NyelvbazisContext())
            {
                try
                {
                    var user = context.Profils.FirstOrDefault(u => u.Nev == felhasznaloNev && u.Email == email);
                    if (user == null)
                    {
                        return BadRequest("Sikertelen aktiválás");

                    }
                    user.Aktiv = 1;
                    context.Profils.Update(user);
                    await context.SaveChangesAsync();
                    return Ok("Sikeres aktiválás");

                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
    }
}
