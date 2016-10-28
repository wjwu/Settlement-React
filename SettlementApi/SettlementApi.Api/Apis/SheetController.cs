using System.Net;
using System.Net.Http;
using System.Web.Http;
using ServiceStack;
using SettlementApi.Api.Dtos;
using SettlementApi.Api.Resource;
using SettlementApi.CommandBus;
using SettlementApi.Read.QueryCommand.SheetModule;
using SettlementApi.Write.BusCommand.SheetModule;

namespace SettlementApi.Api.Apis
{
    public class SheetController : BaseApiController
    {
        private const string BusName = "SheetBusinessLogic";
        private const string ReadName = "QuerySheet";

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


    }
}