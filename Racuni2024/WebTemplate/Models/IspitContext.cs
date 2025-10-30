namespace WebTemplate.Models;

public class IspitContext : DbContext
{
    // DbSet kolekcije!
    public DbSet<Stan> stanovi {get; set;}
    public DbSet<Racun> racuni {get; set;}

    public IspitContext(DbContextOptions options) : base(options)
    {
        
    }
}
