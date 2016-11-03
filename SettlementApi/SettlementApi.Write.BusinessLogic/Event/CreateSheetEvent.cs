using SettlementApi.EventBus;
using SettlementApi.Write.Model;
using System;
using System.Collections.Generic;

namespace SettlementApi.Write.BusinessLogic.Event
{
    public class CreateSheetEvent: IEvent
    {
        public Guid SheetID { get; set; }

        public List<Cost> Costs { get; set; }

        public List<Received> Receiveds { get; set; }
    }
}
