namespace WebTemplate.Models{

    public class Stan{
        [Key]
        public int ID {get; set;}

        public required string Ime {get; set;}

        public required uint Povrsina {get;set;}

        public required uint BrClanova {get; set;}

        public List<Racun>? StanRacuni {get;set;}
    }
}