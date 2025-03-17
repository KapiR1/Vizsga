using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MondatokController : ControllerBase
    {
        [HttpGet("GetAllHungarian")]
        public IActionResult GetAllHungarian()
        {
            using (var context = new NyelvbazisContext())
            {
                try
                {
                    List<MondatokMagyar> result = context.MondatokMagyars.ToList();
                    return Ok(result);
                }
                catch (Exception ex)
                {
                    List<MondatokMagyar> result = new List<MondatokMagyar>();
                    MondatokMagyar hiba = new MondatokMagyar()
                    {
                        Id = -1,
                        MagyarMondatok = ex.Message
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
                    List<MondatokSpanyol> result = context.MondatokSpanyols.ToList();
                    return Ok(result);
                }
                catch (Exception ex)
                {
                    List<MondatokSpanyol> result = new List<MondatokSpanyol>();
                    MondatokSpanyol hiba = new MondatokSpanyol()
                    {
                        Id = -1,
                        SpanyolMondatok = ex.Message
                    };
                    result.Add(hiba);
                    return BadRequest(result);
                }
            }
        }
        [HttpPost("{uId}")]
        public async Task<IActionResult> Post(string uId, string magyarMondat, string spanyolMondat)
        {
            if (Program.LoggedInUsers.ContainsKey(uId) && Program.LoggedInUsers[uId].Jogosultsag > 1)
            {
                using (var context = new NyelvbazisContext())
                {
                    try
                    {
                        MondatokMagyar magyarMondatTemp = new MondatokMagyar { MagyarMondatok = magyarMondat };
                        MondatokSpanyol spanyolMondatTemp = new MondatokSpanyol { SpanyolMondatok = spanyolMondat };

                        magyarMondatTemp.MondatokSpanyol = spanyolMondatTemp;
                        spanyolMondatTemp.IdNavigation = magyarMondatTemp;

                        context.MondatokMagyars.Add(magyarMondatTemp);
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
        public async Task<IActionResult> Update(string uId, int mondatId, string ujMagyarMondat, string ujSpanyolMondat)
        {
            if (Program.LoggedInUsers.ContainsKey(uId) && Program.LoggedInUsers[uId].Jogosultsag > 1)
            {
                using (var context = new NyelvbazisContext())
                {
                    try
                    {
                        var magyarMondatToUpdate = await context.MondatokMagyars.FirstOrDefaultAsync(m => m.Id == mondatId);
                        var spanyolMondatToUpdate = await context.MondatokSpanyols.FirstOrDefaultAsync(s => s.Id == mondatId);

                        if (magyarMondatToUpdate == null || spanyolMondatToUpdate == null)
                        {
                            return NotFound("A mondat nem található");
                        }

                        magyarMondatToUpdate.MagyarMondatok = ujMagyarMondat;
                        spanyolMondatToUpdate.SpanyolMondatok = ujSpanyolMondat;

                        context.MondatokMagyars.Update(magyarMondatToUpdate);
                        context.MondatokSpanyols.Update(spanyolMondatToUpdate);
                        await context.SaveChangesAsync();

                        return Ok("Mondat sikeresen módosítva");
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
            if (Program.LoggedInUsers.ContainsKey(uId) && Program.LoggedInUsers[uId].Jogosultsag > 1)
            {
                using (var context = new NyelvbazisContext())
                {
                    try
                    {
                        var torlendoMagyarMondat = await context.MondatokMagyars.FirstOrDefaultAsync(m => m.Id == torlendoId);
                        var torlendoSpanyolMondat = await context.MondatokSpanyols.FirstOrDefaultAsync(s => s.Id == torlendoId);

                        if (torlendoMagyarMondat == null || torlendoSpanyolMondat == null)
                        {
                            return NotFound("A mondat nem található");
                        }
                        context.MondatokMagyars.Remove(torlendoMagyarMondat);
                        context.MondatokSpanyols.Remove(torlendoSpanyolMondat);
                        await context.SaveChangesAsync();

                        return Ok("Mondat törölve");
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
