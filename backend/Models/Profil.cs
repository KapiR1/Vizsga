using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Profil
{
    public int Id { get; set; }

    public string Nev { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Salt { get; set; } = null!;

    public string Hash { get; set; } = null!;

    public int Pontszam { get; set; }

    public int Jogosultsag { get; set; }

    public int Aktiv { get; set; }

    public virtual Jogok? JogosultsagNavigation { get; set; } = null!;
}
