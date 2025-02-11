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
                    user.JogosultsagNavigation = null;
                    user.Hash = Program.CreateSHA256(user.Hash);
                    Profil profil = new Profil()
                    {
                        Id = 0,
                        Nev = user.Nev,
                        Salt = user.Salt,
                        Hash = user.Hash,
                        Aktiv = 0,
                        Jogosultsag = 0,
                        Email = user.Email,
                        Pontszam = 0,
                        JogosultsagNavigation = null
                    };
                    await context.Profils.AddAsync(profil);
                    await context.SaveChangesAsync();
                    await Program.SendEmail(user.Email, "Regisztráció", $"A következő linkre kattintva véglegesítse a regisztrációját: \nhttp://localhost:5271/api/Registry?Nev={user.Nev}&email={user.Email}");
                    return Ok("Sikeres regisztráció! Az aktiváláshoz ellenőrizze az email fiókját!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpGet]
        public async Task<IActionResult> Activate(string Nev, string email)
        {
            using (var context = new NyelvbazisContext())
            {
                try
                {
                    var user = context.Profils.FirstOrDefault(u => u.Nev == Nev && u.Email == email);
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
