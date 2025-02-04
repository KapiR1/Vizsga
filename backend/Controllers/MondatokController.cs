using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
    }
}