using System.Net;
using System.Net.Http;
using System.Web.Http;
using ServiceStack;
using SettlementApi.Api.Dtos;
using SettlementApi.Api.Resource;

namespace SettlementApi.Api.Utility
{
    public static class ControllerEx
    {
        public static HttpResponseMessage GetInternalServerError(this ApiController controller)
        {
            return new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.InternalServerError,
                Content = new StringContent(new ResponseMessage(CommonRes.ApiApplicationError).ToJson())
            };
        }
    }
}