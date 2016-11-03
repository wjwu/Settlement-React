using System;

namespace SettlementApi.Read.QueryCommand.CostModule
{
    public class RQueryCost
    {
        public Guid ID { get; set; }

        public Guid Type { get; set; }

        public string TypeName { get; set; }

        public int Amount { get; set;}

        public decimal UnitPrice { get; set; }

        public decimal Total { get; set; }

        public string Status { get; set; }

        public string Remark { get; set; }
    }
}
