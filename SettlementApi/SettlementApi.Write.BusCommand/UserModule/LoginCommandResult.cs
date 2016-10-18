using System;
using SettlementApi.CommandBus;

namespace SettlementApi.Write.BusCommand.UserModule
{
    public class LoginCommandResult : ICommandResult
    {
        public Guid ID { get; set; }

        public string LoginID { get; set; }

        public DateTime? LastLoginTime { get; set; }

        public string LastLoginIP { get; set; }
    }
}