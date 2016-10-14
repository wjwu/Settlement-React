using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;
using System.Web.Http;
using SettlementApi.Api.Pools;
using SettlementApi.Common;

namespace SettlementApi.Api.Apis
{
    [Route("api/captcha")]
    public class CaptchaController : BaseApiController
    {
        [HttpGet]
        public HttpResponseMessage Get([FromUri] string t)
        {
            //1441166599603
            var regex = new Regex("\\d{13}");
            if (regex.IsMatch(t))
            {
                var captcha = new Captcha();
                var strCaptcha = captcha.CreateCaptcha();
                CaptchaPool.Add(t, string.Concat(strCaptcha));
                var captchaByte = captcha.CreateCaptchaImage(strCaptcha);
                var result = new HttpResponseMessage(HttpStatusCode.OK) {Content = new ByteArrayContent(captchaByte)};
                result.Content.Headers.ContentType = new MediaTypeHeaderValue("image/png");
                return result;
            }
            return null;
        }

        [HttpPost]
        public HttpResponseMessage Post()
        {
            return null;
        }
    }
}