using System;
using SettlementApi.CommandBus;

namespace SettlementApi.Write.BusCommand.GroupModule
{
    public class DeleteGroupCommand : ICommand
    {
        public Guid ID { get; set; }
    }
}