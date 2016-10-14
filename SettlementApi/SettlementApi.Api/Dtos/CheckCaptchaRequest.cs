using SettlementApi.Api.Utility;
using WebApi.Validation;

namespace SettlementApi.Api.Dtos
{
    public class CheckCaptchaRequest
    {
        [Required]
        [MaxLength(13)]
        [RegularExpression(RegexUtility.Number)]
        public string TimeSpan { get; set; }

        [Required]
        [MaxLength(4)]
        public string Captcha { get; set; }
    }
}