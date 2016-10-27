using System.Web.Http;
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
        public void Create([FromBody] CreateDictionaryCommand request)
        {
            CommandService.Send(request, BusName);
        }

        [HttpPut]
        [Route("api/dictionary")]
        public void Update([FromBody] UpdateDictionaryCommand request)
        {
            CommandService.Send(request, BusName);
        }
    }
}