using backend.DTOs;
using backend;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        [HttpPost("GetSalt/{Nev}")]
        public async Task<IActionResult> GetSalt(string Nev)
        {
            using (var context = new NyelvbazisContext())
            {
                try
                {
                    Profil response = await context.Profils.FirstOrDefaultAsync(u => u.Nev == Nev);
                    if (response == null)
                    {
                        return NotFound("Felhasználó nem található");
                    }
                    return Ok(response.Salt);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            using (var context = new NyelvbazisContext())
            {
                try
                {
                    string hash = Program.CreateSHA256(loginDTO.TmpHash);
                    Profil response = await context.Profils.FirstOrDefaultAsync(u => u.Nev == loginDTO.LoginName && u.Hash == hash);
                    if (response != null && response.Aktiv == 1)
                    {
                        string token = Guid.NewGuid().ToString();
                        lock (Program.LoggedInUsers)
                        {
                            Program.LoggedInUsers.Add(token, response);
                        }
                        return Ok(new LoggedInUser()
                        {
                            Token = token,
                            Nev = response.Nev,
                            Email = response.Email,
                        });

                    }
                    return NotFound("Felhasználó nem található vagy nem aktív");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
    }
}
