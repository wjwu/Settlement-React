using System.Collections.Generic;
using SettlementApi.CommandBus;

namespace SettlementApi.Read.QueryCommand.StatisticsModule
{
    public class QueryUserStatisticsCommandResult : ICommandResult
    {
        public string Total { get; set; }
        public string MonthTotal { get; set; }
        public decimal TotalPercent { get; set; }

        public string Commission { get; set; }
        public string MonthCommission { get; set; }
        public decimal CommissionPercent { get; set; }

        public string Achievement { get; set; }
        public string MonthAchievement { get; set; }
        public decimal AchievementPercent { get; set; }

        public List<string> Date { get; set; }

        public List<decimal> ChartTotal { get; set; }

        public List<int> ChartAmount { get; set; }

        public List<RankAmount> RankAmount { get; set; }

        public List<RankTotal> RankTotal { get; set; }
    }

    public class RankAmount
    {
        public string Name { get; set; }
        public int Amount { get; set; }
    }

    public class RankTotal
    {
        public string Name { get; set; }
        public string Total { get; set; }
    }
}