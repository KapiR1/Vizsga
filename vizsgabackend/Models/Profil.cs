using System;
using System.Collections.Generic;

namespace vizsgabackend.Models;

public partial class Profil
{
    public int Id { get; set; }

    public string Nev { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Jelszo { get; set; } = null!;

    public int Pontszam { get; set; }
}
