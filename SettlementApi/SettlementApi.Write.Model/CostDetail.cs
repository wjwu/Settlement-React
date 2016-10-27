using System;

namespace SettlementApi.Write.Model
{
    public class CostDetail : BaseModel
    {
        public Guid ID { get; set; }

        public Guid SheetID { get; set; }

        public Guid Type { get; set; }

        public int Amount { get; set; }

        public decimal UnitPrice { get; set; }

        public string Status { get; set; }

        public string Remark { get; set; }
    }
}