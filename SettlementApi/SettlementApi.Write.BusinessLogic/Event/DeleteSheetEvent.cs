using System;
using SettlementApi.EventBus;

namespace SettlementApi.Write.BusinessLogic.Event
{
    public class DeleteSheetEvent: IEvent
    {
        public Guid SheetID { get; set; }
    }
}