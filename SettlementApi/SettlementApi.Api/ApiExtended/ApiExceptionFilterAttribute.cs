using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Filters;
using ServiceStack;
using SettlementApi.Api.Dtos;
using SettlementApi.Write.BusinessLogic;

namespace SettlementApi.Api.ApiExtended
{
    public class ApiExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            base.OnException(context);
            var httpResponseException = context.Exception as HttpResponseException;
            if (context.Exception.GetType() == typeof(BussinessException))
            {
                context.Response = new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.BadRequest,
                    Content = new StringContent(new ResponseMessage(context.Exception.Message).ToJson())
                };
            }
            else if (httpResponseException != null)
            {
                context.Response = httpResponseException.Response;
            }
            else
            {
                context.Response = new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.InternalServerError,
                    Content = new StringContent(new ResponseMessage(context.Exception.Message).ToJson())
                };
            }
        }
    }
}