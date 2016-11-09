using System;
using SettlementApi.CommandBus;

namespace SettlementApi.Write.BusCommand.UserModule
{
    public class CreateUserCommand : ICommand
    {
        public string LoginID { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string Name { get; set; }
        public Guid Group { get; set; }
        public string Role { get; set; }
        public bool Enabled { get; set; }
    }
}