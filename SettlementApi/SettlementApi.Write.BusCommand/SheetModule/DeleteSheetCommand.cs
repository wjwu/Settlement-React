using System;
using SettlementApi.CommandBus;

namespace SettlementApi.Write.BusCommand.SheetModule
{
    public class DeleteSheetCommand : ICommand
    {
        public Guid ID { get; set; }
    }
}