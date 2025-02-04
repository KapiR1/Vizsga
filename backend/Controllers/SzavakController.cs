using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
    }
}
