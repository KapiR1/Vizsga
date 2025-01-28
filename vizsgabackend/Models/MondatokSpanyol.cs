using System;
using System.Collections.Generic;

namespace vizsgabackend.Models;

public partial class MondatokSpanyol
{
    public int Id { get; set; }

    public string? SpanyolMondatok { get; set; }

    public virtual MondatokMagyar? IdNavigation { get; set; } = null!;
}
