namespace WebTemplate.Models{

    public class Racun{
        [Key]
        public int ID {get; set;}

        public Stan? RacunStan {get;set;}

        public required string Mesec {get; set;}

        public required uint CenaStruje {get;set;}
        
        public required uint CenaVode {get;set;}

        public required uint CenaKomunalija {get;set;}

        public bool Placen {get;set;}
    }
}