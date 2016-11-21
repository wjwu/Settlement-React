using System.Collections.Generic;
using SettlementApi.CommandBus;

namespace SettlementApi.Read.QueryCommand.StatisticsModule
{
    public class QueryUserStatisticsCommandResult : ICommandResult
    {
        public decimal Total { get; set; }
        public decimal MonthTotal { get; set; }
        public decimal TotalPercent { get; set; }

        public decimal Commission { get; set; }
        public decimal MonthCommission { get; set; }
        public decimal CommissionPercent { get; set; }

        public decimal Achievement { get; set; }
        public decimal MonthAchievement { get; set; }
        public decimal AchievementPercent { get; set; }

        public List<string> Date { get; set; }

        public List<decimal> ChartTotal { get; set; }

        public List<int> ChartAmount { get; set; }
    }
}