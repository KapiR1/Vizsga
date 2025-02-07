using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace backend.Models;

public partial class Jogok
{
    public int Id { get; set; }

    public int Szint { get; set; }

    public string Nev { get; set; } = null!;

    public string Leiras { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<Profil> Profils { get; set; } = new List<Profil>();
}
