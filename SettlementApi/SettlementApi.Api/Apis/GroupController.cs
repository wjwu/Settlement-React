using System.Threading;
using System.Web.Http;
using SettlementApi.CommandBus;
using SettlementApi.Read.QueryCommand.GroupModule;

namespace SettlementApi.Api.Apis
{
    public class GroupController:BaseApiController
    {
        private const string BusName = "QueryBusinessLogic";
        private const string ReadName = "QueryGroup";

        [HttpGet]
        [Route("api/group")]
        public ICommandResult Query([FromUri] QueryGroupCommand request)
        {
            return CommandService.SendEx(request, ReadName);
        }
    }
}