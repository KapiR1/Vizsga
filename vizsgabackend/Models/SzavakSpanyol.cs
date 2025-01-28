using System;
using System.Collections.Generic;

namespace vizsgabackend.Models;

public partial class SzavakSpanyol
{
    public int Id { get; set; }

    public string SpanyolSzo { get; set; } = null!;

    public virtual SzavakMagyar? SzavakMagyar { get; set; }
}
