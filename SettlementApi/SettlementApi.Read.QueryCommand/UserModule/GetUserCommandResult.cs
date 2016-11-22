using System;
using SettlementApi.CommandBus;

namespace SettlementApi.Read.QueryCommand.UserModule
{
    public class GetUserCommandResult : ICommandResult
    {
        public Guid ID { get; set; }

        public string LoginID { get; set; }

        public string Name { get; set; }

        public string Phone { get; set; }

        public Guid Group { get; set; }

        public string Role { get; set; }
    }
}