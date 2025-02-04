using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class MondatokMagyar
{
    public int Id { get; set; }

    public string? MagyarMondatok { get; set; }

    public virtual MondatokSpanyol? MondatokSpanyol { get; set; } = null!;
}
