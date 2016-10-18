using System;
using SettlementApi.CommandBus;

namespace SettlementApi.Read.QueryCommand
{
    public class GetByIDCommand : ICommand
    {
        public Guid ID { get; set; }
    }
}