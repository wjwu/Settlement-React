using SettlementApi.Api.Utility;
using WebApi.Validation;

namespace SettlementApi.Api.Dtos.Sign
{
    public class SignInRequest
    {
        [Required]
        [MaxLength(20)]
        public string LoginID { get; set; }

        [Required]
        [RegularExpression(RegexUtility.Md5Password)]
        public string Password { get; set; }

        [Required]
        [MaxLength(5)]
        public string Captcha { get; set; }

        [Required]
        [RegularExpression(RegexUtility.Number)]
        public string TimeSpan { get; set; }

    }
}