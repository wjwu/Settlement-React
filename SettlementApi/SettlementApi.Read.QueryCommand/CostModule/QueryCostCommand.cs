using System;
using SettlementApi.CommandBus;

namespace SettlementApi.Read.QueryCommand.CostModule
{
    public class QueryCostCommand : ICommand
    {
        public Guid SheetID { get; set; }
    }
}