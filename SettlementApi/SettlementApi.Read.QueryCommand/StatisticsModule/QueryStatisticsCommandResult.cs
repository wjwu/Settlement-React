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
        public string Profits { get; set; }
        public string Commission { get; set; }
        public string AfterProfits { get; set; }
        public string Received { get; set; }
        public string Remaining { get; set; }

        public Dictionary<string, decimal> Sources { get; set; }

        public Dictionary<string, decimal> Departments { get; set; }

        public List<UserProfits> UserProfits { get; set; }

        public List<DepartmentProfits> DepartmentProfits { get; set; }
    }

    public class UserProfits
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public string Department { get; set; }
        public decimal Percent { get; set; }
        public int Amount { get; set; }
        public decimal Total { get; set; }
        public decimal Cost { get; set; }
        public decimal Commission { get; set; }
    }

    public class DepartmentProfits
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public decimal Percent { get; set; }
        public int Amount { get; set; }
        public decimal Total { get; set; }
        public decimal Cost { get; set; }
        public decimal Commission { get; set; }
    }
}