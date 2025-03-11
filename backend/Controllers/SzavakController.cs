using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SzavakController : ControllerBase
    {
        [HttpGet("GetAllHungarian")]
        public IActionResult GetAllHungarian()
        {
            using (var context = new NyelvbazisContext())
            {
                try
                {
                    List<SzavakMagyar> result = context.SzavakMagyars.ToList();
                    return Ok(result);
                }
                catch (Exception ex)
                {
                    List<SzavakMagyar> result = new List<SzavakMagyar>();
                    SzavakMagyar hiba = new SzavakMagyar()
                    {
                        Id = -1,
                        MagyarSzo = ex.Message
                    };
                    result.Add(hiba);
                    return BadRequest(result);
                }
            }
        }
        [HttpGet("GetAllSpanish")]
        public IActionResult GetAllSpanish()
        {
            using (var context = new NyelvbazisContext())
            {
                try
                {
                    List<SzavakSpanyol> result = context.SzavakSpanyols.ToList();
                    return Ok(result);
                }
                catch (Exception ex)
                {
                    List<SzavakSpanyol> result = new List<SzavakSpanyol>();
                    SzavakSpanyol hiba = new SzavakSpanyol()
                    {
                        Id = -1,
                        SpanyolSzo = ex.Message
                    };
                    result.Add(hiba);
                    return BadRequest(result);
                }
            }
        }
        [HttpPost("{uId}")]
        public async Task<IActionResult> Post(string uId, string magyarSzo, string spanyolSzo)
        {
            if (Program.LoggedInUsers.ContainsKey(uId) && Program.LoggedInUsers[uId].Jogosultsag > 1)
            {
                using (var context = new NyelvbazisContext())
                {
                    try
                    {
                        SzavakMagyar magyarSzoTemp = new SzavakMagyar { MagyarSzo = magyarSzo };
                        SzavakSpanyol spanyolSzoTemp = new SzavakSpanyol { SpanyolSzo = spanyolSzo };

                        magyarSzoTemp.IdNavigation = spanyolSzoTemp;
                        spanyolSzoTemp.SzavakMagyar = magyarSzoTemp;

                        context.SzavakMagyars.Add(magyarSzoTemp);
                        await context.SaveChangesAsync();
                        return Ok("Sikeres rögzítés");
                    }
                    catch (Exception ex)
                    {
                        return BadRequest($"Hiba történt: {ex.Message}");
                    }
                }
            }
            else
            {
                return StatusCode(StatusCodes.Status401Unauthorized, "Nincs jogosultság");
            }
        }
        [HttpPut("{uId}")]
        public async Task<IActionResult> Update(string uId, int szoId, string ujMagyarSzo, string ujSpanyolSzo)
        {
            if(Program.LoggedInUsers.ContainsKey(uId) && Program.LoggedInUsers[uId].Jogosultsag > 1)
            {
                using(var context = new NyelvbazisContext())
                {
                    try
                    {
                        var magyarSzoToUpdate = await context.SzavakMagyars.FirstOrDefaultAsync(m => m.Id == szoId);
                        var spanyolSzoToUpdate = await context.SzavakSpanyols.FirstOrDefaultAsync(s => s.Id == szoId);

                        if(magyarSzoToUpdate == null || spanyolSzoToUpdate == null)
                        {
                            return NotFound("A szó nem található");
                        }

                        magyarSzoToUpdate.MagyarSzo = ujMagyarSzo;
                        spanyolSzoToUpdate.SpanyolSzo = ujSpanyolSzo;

                        context.SzavakMagyars.Update(magyarSzoToUpdate);
                        context.SzavakSpanyols.Update(spanyolSzoToUpdate);
                        await context.SaveChangesAsync();

                        return Ok("Szó sikeresen módosítva");
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
        [HttpDelete("{uId}")]
        public async Task<IActionResult> Delete(string uId, int torlendoId)
        {
            if(Program.LoggedInUsers.ContainsKey(uId) && Program.LoggedInUsers[uId].Jogosultsag > 1)
            {
                using(var context = new NyelvbazisContext())
                {
                    try
                    {
                        var torlendoMagyarSzo = await context.SzavakMagyars.FirstOrDefaultAsync(m => m.Id == torlendoId);
                        var torlendoSpanyolSzo = await context.SzavakSpanyols.FirstOrDefaultAsync(s => s.Id == torlendoId);

                        if(torlendoMagyarSzo == null || torlendoSpanyolSzo == null)
                        {
                            return NotFound("A szó nem található");
                        }
                        context.SzavakMagyars.Remove(torlendoMagyarSzo);
                        context.SzavakSpanyols.Remove(torlendoSpanyolSzo);
                        await context.SaveChangesAsync();

                        return Ok("Szó törölve");
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
    }
}
