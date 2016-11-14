using SettlementApi.CommandBus;
using System;

namespace SettlementApi.Read.QueryCommand.GroupModule
{
    public class QueryGroupCommand : ICommand
    {
        public Guid ParentID {get;set;}
        public Guid ID { get; set; }
    }
}