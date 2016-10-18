using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;
using ServiceStack;
using SettlementApi.Api.Dtos;
using SettlementApi.Api.Dtos.Sign;
using SettlementApi.Api.Pools;
using SettlementApi.Api.Resource;
using SettlementApi.CommandBus;
using SettlementApi.Common.Mapper;
using SettlementApi.Write.BusCommand;
using SettlementApi.Write.BusCommand.UserModule;

namespace SettlementApi.Api.Apis
{
    public class SignController : BaseApiController
    {
        private const string BusName = "UserBusinessLogic";

        [HttpPost]
        [Route("api/sign/in")]
        public SignInResponse SignIn(SignInRequest request)
        {
            string captcha = CaptchaPool.Get(request.TimeSpan);
            if (!captcha.ToLower().Equals(request.Captcha.ToLower()))
            {
                throw new Exception(CommonRes.CaptchaError);
            }
            LoginCommand cmd = MapperHelper.Map<SignInRequest, LoginCommand>(request);

            var result = CommandService.SendEx(cmd, BusName) as LoginCommandResult;

            ApiContext apiContext = ApiContextPool.StartNewContext(result.ID);

            SignInResponse response = MapperHelper.Map<LoginCommandResult, SignInResponse>(result, new ExtendedMapper());

            response.Token = apiContext.Token;
  
            return response;
        }

        [HttpGet]
        [Route("api/sign/expired")]
        public ResponseMessageResult SignExpired()
        {
            if (ApiContextPool.IsContextInvalid())
            {
                return ResponseMessage(new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.NotFound,
                    Content = new StringContent(new ResponseMessage(CommonRes.SessionExpired).ToJson())
                });
            }
            return ResponseMessage(new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent(new ResponseMessage(CommonRes.SessionNotExpired).ToJson())
            });
        }

        [HttpGet]
        [Route("api/sign/out")]
        public ResponseMessage SignOut()
        {
            if (ApiContextPool.IsContextInvalid())
            {
                return new ResponseMessage(CommonRes.InvalidSession);
            }
            ApiContextPool.RemoveContext();
            return new ResponseMessage(CommonRes.SignOutSuccessful);
        }
    }
}