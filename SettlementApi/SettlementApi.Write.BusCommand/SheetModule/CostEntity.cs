using System;

namespace SettlementApi.Write.BusCommand.SheetModule
{
    public class CostEntity
    {
        public Guid Type { get; set; }

        public int Amount { get; set; }

        public decimal UnitPrice { get; set; }

        public string Status { get; set; }

        public string Remark { get; set; }
    }
}