using SettlementApi.CommandBus;
using System;

namespace SettlementApi.Read.QueryCommand.ReceivedModule
{
    public class QueryReceivedCommand:ICommand
    {
        public Guid SheetID { get; set; }
    }
}
