using System;
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
            return CommandService.SendEx(request, ReadName);
        }

        [HttpPost]
        [Route("api/group")]
        public void Create([FromBody] CreateGroupCommand request)
        {
            CommandService.Send(request, BusName);
        }

        [HttpPut]
        [Route("api/group")]
        public void Update([FromBody] UpdateGroupCommand request)
        {
            CommandService.Send(request, BusName);
        }

        [HttpDelete]
        [Route("api/group/{id:guid}")]
        public void Delete(Guid id)
        {
            CommandService.Send(new DeleteGroupCommand {ID = id}, BusName);
        }
    }
}