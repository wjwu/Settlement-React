using SettlementApi.EventBus;
using SettlementApi.Write.Model;
using System;
using System.Collections.Generic;
using SettlementApi.Write.Model.Enums;

namespace SettlementApi.Write.BusinessLogic.Event
{
    public class UpdateSheetEvent: IEvent
    {
        public Guid SheetID { get; set; }

        public Guid UserID { get; set; }

        public decimal Profit { get; set; }

        public AuditStatus OldAuditStatus { get; set; }

        public AuditStatus NewAuditStatus { get; set; }

        public List<Cost> Costs { get; set; }

        public List<Received> Receiveds { get; set; }
    }
}
