using SettlementApi.CommandBus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SettlementApi.Read.QueryCommand.StatisticsModule
{
    public class QueryStatisticsCommandResult: ICommandResult
    {
        public int Amount { get; set; }
        public string Total { get; set; }
        public string Cost { get; set; }
        public string Profits { get; set; }
        public string Commission { get; set; }
        public string AfterProfits { get; set; }
        public string Received { get; set; }
        public string Remaining { get; set; }

        public Dictionary<string, decimal> Sources { get; set;}
    }
}
