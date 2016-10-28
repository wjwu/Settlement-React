using System.Net;
using System.Net.Http;
using System.Web.Http;
using ServiceStack;
using SettlementApi.Api.Dtos;
using SettlementApi.Api.Resource;
using SettlementApi.CommandBus;
using SettlementApi.Read.QueryCommand.DictionaryModule;
using SettlementApi.Write.BusCommand.DictionaryModule;

namespace SettlementApi.Api.Apis
{
    public class DictionaryController : BaseApiController
    {
        private const string BusName = "DictionaryBusinessLogic";
        private const string ReadName = "QueryDictionary";

        [HttpGet]
        [Route("api/dictionary")]
        public ICommandResult Query([FromUri] QueryDictionaryCommand request)
        {
            return  CommandService.SendEx(request, ReadName);
        }

        [HttpPost]
        [Route("api/dictionary")]
        public HttpResponseMessage Create([FromBody] CreateDictionaryCommand request)
        {
            CommandService.Send(request, BusName);
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(new ResponseMessage(CommonRes.Success).ToJson())
            };
        }

        [HttpPut]
        [Route("api/dictionary")]
        public HttpResponseMessage Update([FromBody] UpdateDictionaryCommand request)
        {
            CommandService.Send(request, BusName);
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(new ResponseMessage(CommonRes.Success).ToJson())
            };
        }
    }
}