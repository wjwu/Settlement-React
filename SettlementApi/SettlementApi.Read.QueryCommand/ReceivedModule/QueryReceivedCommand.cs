using System;
using SettlementApi.CommandBus;

namespace SettlementApi.Read.QueryCommand.ReceivedModule
{
    public class QueryReceivedCommand : ICommand
    {
        public Guid SheetID { get; set; }
    }
}