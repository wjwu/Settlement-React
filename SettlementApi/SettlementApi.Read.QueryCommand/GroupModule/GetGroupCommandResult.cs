using SettlementApi.CommandBus;
using System;

namespace SettlementApi.Read.QueryCommand.GroupModule
{
    public class GetGroupCommandResult: ICommandResult
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public Guid ParentID { get; set; }
        public decimal Percent { get; set; }
    }
}
