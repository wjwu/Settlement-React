using System;
using SettlementApi.CommandBus;

namespace SettlementApi.Write.BusCommand.GroupModule
{
    public class UpdateGroupCommand : ICommand
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
    }
}