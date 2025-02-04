using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class SzavakMagyar
{
    public int Id { get; set; }

    public string MagyarSzo { get; set; } = null!;

    public virtual SzavakSpanyol? IdNavigation { get; set; } = null!;
}
