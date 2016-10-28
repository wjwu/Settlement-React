using System.Net;
using System.Net.Http;
using System.Web.Http;
using ServiceStack;
using SettlementApi.Api.Dtos;
using SettlementApi.Api.Resource;
using SettlementApi.CommandBus;
using SettlementApi.Read.QueryCommand.UserModule;
using SettlementApi.Write.BusCommand.UserModule;

namespace SettlementApi.Api.Apis
{
    public class UserController : BaseApiController
    {
        private const string BusName = "UserBusinessLogic";
        private const string ReadName = "QueryUser";

        [HttpGet]
        [Route("api/user")]
        public ICommandResult Query([FromUri] QueryUserCommand request)
        {
            return CommandService.SendEx(request, ReadName);
        }

        [HttpPost]
        [Route("api/user")]
        public HttpResponseMessage Create([FromBody]CreateUserCommand request)
        {
            CommandService.Send(request, BusName);
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(new ResponseMessage(CommonRes.Success).ToJson())
            };
        }

        [HttpPut]
        [Route("api/user")]
        public HttpResponseMessage Update([FromBody]UpdateUserCommand request)
        {
            CommandService.Send(request, BusName);
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(new ResponseMessage(CommonRes.Success).ToJson())
            };
        }

        [HttpPatch]
        [Route("api/user/password")]
        public HttpResponseMessage ChangePassword(ChangePasswordCommand request)
        {
            CommandService.Send(request, BusName);
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(new ResponseMessage(CommonRes.Success).ToJson())
            };
        }
    }
}