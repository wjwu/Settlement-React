﻿using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;
using System.Threading;
using System.Web.Http;
using ServiceStack;
using SettlementApi.Api.Dtos;
using SettlementApi.Api.Pools;
using SettlementApi.Api.Resource;
using SettlementApi.Common;

namespace SettlementApi.Api.Apis
{
    public class CaptchaController : BaseApiController
    {
        [HttpGet]
        [Route("api/captcha")]
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
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}