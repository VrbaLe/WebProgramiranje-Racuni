namespace WebTemplate.Controllers;

[ApiController]
[Route("[controller]")]
public class IspitController : ControllerBase
{
    public IspitContext Context { get; set; }

    public IspitController(IspitContext context)
    {
        Context = context;
    }
    
    [HttpGet("VratiStan/{idStana}")]
    public async Task<ActionResult> VratiStan(int idStana)
    {
        try
        {
            var stan= await Context.stanovi.Where(s=>s.ID==idStana)
                                            .Include(s=>s.StanRacuni)
                                            .Select(s=>new {
                                                ime=s.Ime,
                                                povrsina=s.Povrsina,
                                                brclanova=s.BrClanova,
                                                racuni=s.StanRacuni.Select(r=> new{
                                                    mesec=r.Mesec,
                                                    cenastruje=r.CenaStruje,
                                                    cenavode=r.CenaVode,
                                                    cenakomunalija= r.CenaKomunalija,
                                                    placen= r.Placen
                                                }).ToList()
                                            }).FirstOrDefaultAsync();


                return Ok(stan);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("IzracunajZaduzenje/{idStana}")]
    public async Task<ActionResult> IzracunajZaduzenje(int idStana)
    {
        try
        {
            var neplaceniRacuni= await Context.racuni.Where(r=>r.RacunStan!=null && r.RacunStan.ID==idStana && !r.Placen)
                                                     .ToListAsync();
            
            uint ukupno=0;
            foreach (var r in neplaceniRacuni)
            {
                ukupno += r.CenaStruje + r.CenaVode + r.CenaKomunalija;
            }

            return Ok(ukupno);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("BrojStanova")]
    public async Task<ActionResult<int>> BrojStanova()
    {
        try
        {
           int brojStanova = await Context.stanovi.CountAsync();
           return Ok(brojStanova);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

}
