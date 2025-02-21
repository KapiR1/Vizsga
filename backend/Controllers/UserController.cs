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
            if (Program.LoggedInUsers.ContainsKey(uId) && Program.LoggedInUsers[uId].Jogosultsag == 2)
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
        public async Task<IActionResult> UpdateScore(string uId, [FromBody] int newScore)
        {
            if (!Program.LoggedInUsers.ContainsKey(uId))
            {
                return Unauthorized("Nem bejelentkezett felhasználó.");
            }

            using (var context = new NyelvbazisContext())
            {
                try
                {
                    var user = await context.Profils.FirstOrDefaultAsync(f => f.Id.ToString() == uId);
                    if (user == null)
                    {
                        return NotFound("Felhasználó nem található.");
                    }

                    if (newScore > user.Pontszam)
                    {
                        user.Pontszam = newScore;
                        await context.SaveChangesAsync();
                        return Ok(new { message = "Pontszám frissítve.", newHighScore = newScore });
                    }
                    else
                    {
                        return Ok(new { message = "Nem történt frissítés, mert az új pontszám nem nagyobb." });
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(new { error = "Hiba a frissítés során.", details = ex.Message });
                }
            }
        }




    }
}
