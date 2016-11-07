using System.Net;
using System.Net.Http;
using System.Web.Http;
using ServiceStack;
using SettlementApi.Api.Dtos;
using SettlementApi.Api.Resource;
using SettlementApi.CommandBus;
using SettlementApi.Read.QueryCommand.SheetModule;
using SettlementApi.Write.BusCommand.SheetModule;
using System;
using SettlementApi.Read.QueryCommand;
using System.Threading;

namespace SettlementApi.Api.Apis
{
    public class SheetController : BaseApiController
    {
        private const string BusName = "SheetBusinessLogic";
        private const string ReadName = "QuerySheet";

        [HttpGet]
        [Route("api/sheet/{id:guid}")]
        public ICommandResult Query(Guid id)
        {
            return CommandService.SendEx(new GetByIDCommand
            {
                ID = id
            }, ReadName);
        }

        [HttpGet]
        [Route("api/sheet")]
        public ICommandResult Query([FromUri] QuerySheetCommand request)
        {
            return CommandService.SendEx(request, ReadName);
        }

        [HttpPost]
        [Route("api/sheet")]
        public HttpResponseMessage Create([FromBody] CreateSheetCommand request)
        {
            CommandService.Send(request, BusName);
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(new ResponseMessage(CommonRes.Success).ToJson())
            };
        }

        [HttpPut]
        [Route("api/sheet")]
        public HttpResponseMessage Update([FromBody] UpdateSheetCommand request)
        {
            CommandService.Send(request, BusName);
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(new ResponseMessage(CommonRes.Success).ToJson())
            };
        }

        [HttpDelete]
        [Route("api/sheet/{id:guid}")]
        public HttpResponseMessage Delete(Guid id)
        {
            CommandService.Send(new DeleteSheetCommand { ID=id}, BusName);
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(new ResponseMessage(CommonRes.Success).ToJson())
            };
        }
    }
}