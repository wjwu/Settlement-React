using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Web.Http.ModelBinding;
using ServiceStack;
using SettlementApi.Api.Apis;
using SettlementApi.Api.Dtos;
using SettlementApi.Api.Pools;
using SettlementApi.Api.Resource;

namespace SettlementApi.Api.ApiExtended
{
    public class ValidatorActionFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            base.OnActionExecuting(actionContext);
            //auth 验证码
            if (actionContext.ControllerContext.Request.Method != HttpMethod.Get &&
                actionContext.ControllerContext.Controller.GetType() != typeof(SignController)&&
                actionContext.ControllerContext.Controller.GetType() != typeof(CaptchaController))
            {
                var response = new HttpResponseMessage
                {
                    Content = new StringContent(new ResponseMessage(CommonRes.NotAuthorized).ToJson()),
                    StatusCode = HttpStatusCode.Unauthorized
                };
                try
                {
                    ApiContext context = ApiContextPool.GetCurrentContext();
                    if (context == null)
                    {
                        throw new HttpResponseException(response);
                    }
                }
                catch (Exception)
                {
                    throw new HttpResponseException(response);
                }
            }

            //model valid
            if (!actionContext.ModelState.IsValid)
            {
                foreach (ModelState modelState in actionContext.ModelState.Values)
                {
                    if (modelState.Errors.Count > 0)
                    {
                        foreach (ModelError modelError in modelState.Errors)
                        {
                            var response = new HttpResponseMessage
                            {
                                Content = new StringContent(modelError.ErrorMessage),
                                StatusCode = (HttpStatusCode)422
                            };
                            throw new HttpResponseException(response);
                        }
                    }
                }
            }
        }
    }
}