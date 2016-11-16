using System;
using SettlementApi.CommandBus;

namespace SettlementApi.Read.QueryCommand.GroupModule
{
    public class QueryGroupCommand : ICommand
    {
        public Guid ParentID { get; set; }
        public Guid ID { get; set; }
    }
}