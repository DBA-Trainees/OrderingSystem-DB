using System.ComponentModel.DataAnnotations;

namespace OrderingSystem.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}