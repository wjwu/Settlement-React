using SettlementApi.CommandBus;
using SettlementApi.Common.Mapper;
using SettlementApi.Read.QueryCommand.DictionaryModule;
using SettlementApi.Read.QueryCommand.SheetModule;
using SettlementApi.Read.QueryCommand.StatisticsModule;
using SettlementApi.Write.Model.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SettlementApi.Read.Respository
{
    public class QueryStatistics : BaseRRespository,
         ICommandBus<QueryStatisticsCommand, QueryStatisticsCommandResult>
    {
        public QueryStatisticsCommandResult Execute(QueryStatisticsCommand command)
        {
            var querySheetCmd = MapperHelper.Map<QueryStatisticsCommand, QuerySheetCommand>(command);
            querySheetCmd.PageSize = int.MaxValue;
            var sheets = new QuerySheet().Execute(querySheetCmd);
            var result = new QueryStatisticsCommandResult() {
                  Total="0",
                  Cost="0",
                Profits="0",
                Commission = "0",
                AfterProfits = "0",
                Received = "0",
                Remaining = "0",
            };
            if (sheets.List!=null)
            {
                result.Amount = sheets.List.Count;
                decimal total= sheets.List.Sum(p => p.TotalPrice);
                result.Total = total.ToString("N");
                decimal cost= sheets.List.Sum(p => p.CostPrice);
                result.Cost = cost.ToString("N");
                result.Profits = string.Format("{0:N}", total - cost);
                decimal commission= sheets.List.Sum(p => p.Commission);
                result.Commission= commission.ToString("N");
                result.AfterProfits = string.Format("{0:N}", total - cost - commission);
                decimal received= sheets.List.Sum(p => p.ReceivedMoney);
                result.Received= received.ToString("N");
                decimal remaining = sheets.List.Sum(p => p.RemainingMoney);
                result.Remaining = remaining.ToString("N");
                decimal amount = result.Amount;
                result.Sources = sheets.List.GroupBy(p => p.Source).Select(p => new { Name = p.Key, Value =((decimal)p.Count())/ amount }).ToDictionary(p=>p.Name,p=>decimal.Round(p.Value,2));
            }
            return result;
        }

        public void Receive(ICommand command)
        {
            throw new NotImplementedException();
        }

        public ICommandResult ReceiveEx(ICommand command)
        {
            if (command.GetType()==typeof(QueryStatisticsCommand))
            {
                return Execute((QueryStatisticsCommand)command);
            }
            return null;
        }
    }
}
