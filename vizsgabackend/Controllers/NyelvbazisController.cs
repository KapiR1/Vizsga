using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using vizsgabackend.Models;
using Microsoft.EntityFrameworkCore;

namespace vizsgabackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NyelvbazisController : ControllerBase
    {
        [HttpGet("GetAllHungarian")]
        public IActionResult GetAllHungarian()
        {
            using (var context = new NyelvbazisContext())
            {
                try
                {
                    List<SzavakMagyar> result = context.SzavakMagyars.ToList();
                    return StatusCode(200, result);
                }
                catch (Exception ex)
                {
                    List<SzavakMagyar> result = context.SzavakMagyars.ToList();
                    SzavakMagyar error = new SzavakMagyar()
                    {
                        Id = -1,
                        MagyarSzo = ex.Message
                    };
                    result.Add(error);
                    return StatusCode(400, result);
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
                    return StatusCode(200, result);
                }
                catch (Exception ex)
                {
                    List<SzavakSpanyol> result = context.SzavakSpanyols.ToList();
                    SzavakSpanyol error = new SzavakSpanyol()
                    {
                        Id = -1,
                        SpanyolSzo = ex.Message
                    };
                    result.Add(error);
                    return StatusCode(400, result);
                }
            }
        }
    }
}
