using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ServiceStack;
using SettlementApi.Api.Dtos;
using SettlementApi.Api.Resource;
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
        public HttpResponseMessage Create([FromBody] CreateGroupCommand request)
        {
            CommandService.Send(request, BusName);
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(new ResponseMessage(CommonRes.Success).ToJson())
            };
        }

        [HttpPut]
        [Route("api/group")]
        public HttpResponseMessage Update([FromBody] UpdateGroupCommand request)
        {
            CommandService.Send(request, BusName);
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(new ResponseMessage(CommonRes.Success).ToJson())
            };
        }

        [HttpDelete]
        [Route("api/group/{id:guid}")]
        public HttpResponseMessage Delete(Guid id)
        {
            CommandService.Send(new DeleteGroupCommand {ID = id}, BusName);
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(new ResponseMessage(CommonRes.Success).ToJson())
            };
        }
    }
}