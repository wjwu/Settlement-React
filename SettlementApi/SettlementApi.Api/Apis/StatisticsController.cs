using System.Web.Http;
using SettlementApi.CommandBus;
using SettlementApi.Read.QueryCommand.StatisticsModule;

namespace SettlementApi.Api.Apis
{
    public class StatisticsController : BaseApiController
    {
        private const string ReadName = "QueryStatistics";

        [HttpGet]
        [Route("api/statistics")]
        public ICommandResult Query([FromUri] QueryStatisticsCommand request)
        {
            return CommandService.SendEx(request, ReadName);
        }
    }
}