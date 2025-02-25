using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {


        [HttpGet]
        public IActionResult Get(string uId)
        {
            if (Program.LoggedInUsers.ContainsKey(uId) && Program.LoggedInUsers[uId].Jogosultsag == 2)
            {
                using (var context = new NyelvbazisContext())
                {
                    try
                    {
                        return Ok(context.Profils.Include(f => f.JogosultsagNavigation).ToList());
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(ex.Message);
                    }
                }
            }
            else
            {
                return Unauthorized("Nem jogosult felhasználó");
            }
        }

        [HttpGet("GetScore")]
        public IActionResult GetScore(string uId, string Nev)
        {
            if (Program.LoggedInUsers.ContainsKey(uId) && Program.LoggedInUsers[uId].Aktiv > 0)
            {
                using (var context = new NyelvbazisContext())
                {
                    try
                    {
                        var pontszam = context.Profils
                                .Where(p => p.Nev == Nev)
                                .Select(p => p.Pontszam)
                                .FirstOrDefault();
                        if (pontszam != null)
                        {
                            return Ok(pontszam);
                        }
                        else
                        {
                            return NotFound("Felhasználó pontszáma nem található.");
                        }
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(ex.Message);
                    }
                }
            }
            else
            {
                return Unauthorized("Nem jogosult felhasználó");
            }
        }

        [HttpGet("{uId,Nev}")]
        public IActionResult GetNev(string uId, string Nev)
        {
            if (Program.LoggedInUsers.ContainsKey(uId) && Program.LoggedInUsers[uId].Jogosultsag >= 2)
            {
                using (var context = new NyelvbazisContext())
                {
                    try
                    {
                        var result = context.Profils.FirstOrDefault(f => f.Nev == Nev);
                        if (result == null)
                        {
                            return NotFound("Felhasználó nem található");
                        }
                        return Ok(result);
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(ex.Message);
                    }
                }
            }
            else
            {
                return Unauthorized("Nem jogosult felhasználó");
            }
        }

        [HttpPost("{uId}")]
        public async Task<IActionResult> Post(string uId, Profil user)
        {
            if (Program.LoggedInUsers.ContainsKey(uId) && Program.LoggedInUsers[uId].Jogosultsag == 1)
            {
                using (var context = new NyelvbazisContext())
                {
                    try
                    {
                        context.Profils.Add(user);
                        await context.SaveChangesAsync();
                        return Ok("Sikeres rögzítés");
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(ex.Message);
                    }
                }
            }
            else
            {
                return StatusCode(StatusCodes.Status401Unauthorized, "Nincs jogosultság");
            }
        }

        [HttpPut("updateScore/{uId}")]
        public async Task<IActionResult> Put(string uId, Profil profil)
        {
            if (Program.LoggedInUsers.ContainsKey(uId) && Program.LoggedInUsers[uId].Aktiv > 0)
            {
                using (var context = new NyelvbazisContext())
                {
                    try
                    {
                        if (context.Profils.Select(p => p.Email).Contains(profil.Email))
                        {
                            Profil old = context.Profils.FirstOrDefault(p => p.Email == profil.Email);
                            old.Pontszam = profil.Pontszam;
                            context.Update(old);
                            await context.SaveChangesAsync();
                            return Ok("Sikeres módosítás.");
                        }
                        else
                        {
                            return BadRequest("Nem található a felhasználó.");
                        }
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(ex.Message);
                    }
                }
            }
            else
            {
                return StatusCode(StatusCodes.Status401Unauthorized, "Nincs jogosultság");
            }
        }
    }
}
