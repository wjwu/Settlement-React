using System;
using System.Collections.Generic;
using SettlementApi.CommandBus;

namespace SettlementApi.Read.QueryCommand.StatisticsModule
{
    public class QueryStatisticsCommandResult : ICommandResult
    {
        public int Amount { get; set; }
        public string Total { get; set; }
        public string Cost { get; set; }
        public string Profit { get; set; }
        public string Commission { get; set; }
        public string AfterProfit { get; set; }
        public string Received { get; set; }
        public string Remaining { get; set; }

        public Dictionary<string, decimal> Source { get; set; }

        public Dictionary<string, decimal> Department { get; set; }

        public List<UserProfit> UserProfit { get; set; }

        public List<DepartmentProfit> DepartmentProfit { get; set; }
    }

    public class UserProfit
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public string Department { get; set; }
        public decimal Percent { get; set; }
        public int Amount { get; set; }
        public decimal Total { get; set; }
        public decimal Cost { get; set; }
        public decimal Commission { get; set; }
        public decimal Achievement { get; set; }
    }

    public class DepartmentProfit
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public decimal Percent { get; set; }
        public int Amount { get; set; }
        public decimal Total { get; set; }
        public decimal Cost { get; set; }
        public decimal Commission { get; set; }
        public decimal Achievement { get; set; }
    }
}