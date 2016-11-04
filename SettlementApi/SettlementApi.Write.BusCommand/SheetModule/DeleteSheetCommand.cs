using SettlementApi.CommandBus;
using System;

namespace SettlementApi.Write.BusCommand.SheetModule
{
    public class DeleteSheetCommand: ICommand
    {
        public Guid ID { get; set; }
    }
}
