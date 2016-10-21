using System;
using SettlementApi.CommandBus;

namespace SettlementApi.Write.BusCommand.UserModule
{
    public class UpdateUserCommand : ICommand
    {
        public Guid ID { get; set; }
        public string Phone { get; set; }
        public string Name { get; set; }
        public bool Enabled { get; set; }
    }
}