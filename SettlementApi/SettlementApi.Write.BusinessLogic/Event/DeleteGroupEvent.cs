using System;
using SettlementApi.EventBus;

namespace SettlementApi.Write.BusinessLogic.Event
{
    public class DeleteGroupEvent : IEvent
    {
        public Guid NewGroup { get; set; }
        public Guid OldGroup { get; set; }
    }
}