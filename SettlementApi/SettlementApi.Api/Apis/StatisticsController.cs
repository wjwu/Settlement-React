using SettlementApi.CommandBus;
using SettlementApi.Read.QueryCommand.StatisticsModule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace SettlementApi.Api.Apis
{
    public class StatisticsController: BaseApiController
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