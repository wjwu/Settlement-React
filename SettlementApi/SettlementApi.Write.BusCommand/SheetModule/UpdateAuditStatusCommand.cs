using System;
using SettlementApi.CommandBus;

namespace SettlementApi.Write.BusCommand.SheetModule
{
    public class UpdateAuditStatusCommand : ICommand
    {
        public Guid ID { get; set; }

        public bool Pass { get; set; }
    }
}