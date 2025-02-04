namespace backend.DTOs
{
    public class LoggedInUser
    {
        public string Token { get; set; } = null!;
        public string Nev { get; set; } = null!;
        public string Email {  get; set; } = null!;
    }
}
