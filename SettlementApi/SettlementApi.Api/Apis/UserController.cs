using System.Web.Http;
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
        public void Create([FromBody]CreateUserCommand request)
        {
            CommandService.Send(request, BusName);
        }

        [HttpPatch]
        [Route("api/user/password")]
        public void ChangePassword(ChangePasswordCommand request)
        {
            CommandService.Send(request, BusName);
        }
    }
}