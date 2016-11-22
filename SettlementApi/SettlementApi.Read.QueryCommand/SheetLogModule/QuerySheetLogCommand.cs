using System;
using SettlementApi.CommandBus;

namespace SettlementApi.Read.QueryCommand.SheetLogModule
{
    public class QuerySheetLogCommand:ICommand
    {
        public Guid SheetID { get; set; }
    }
}