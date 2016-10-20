using System.Threading;
using System.Web.Http;
using SettlementApi.CommandBus;
using SettlementApi.Read.QueryCommand.GroupModule;
using SettlementApi.Write.BusCommand.GroupModule;

namespace SettlementApi.Api.Apis
{
    public class GroupController : BaseApiController
    {
        private const string BusName = "GroupBusinessLogic";
        private const string ReadName = "QueryGroup";

        [HttpGet]
        [Route("api/group")]
        public ICommandResult Query([FromUri] QueryGroupCommand request)
        {
            Thread.Sleep(2000);
            return CommandService.SendEx(request, ReadName);
        }

        [HttpPost]
        [Route("api/group")]
        public void Create([FromBody] CreateGroupCommand request)
        {
            Thread.Sleep(2000);
            CommandService.Send(request, BusName);
        }
    }
}