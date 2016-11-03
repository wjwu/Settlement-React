using SettlementApi.CommandBus;
using System;

namespace SettlementApi.Read.QueryCommand.CostModule
{
    public class QueryCostCommand: ICommand
    {
        public Guid SheetID { get; set; }
    }
}
