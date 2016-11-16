using System;

namespace SettlementApi.Read.QueryCommand.SheetModule
{
    public class RQuerySheet
    {
        public Guid ID { get; set; }

        public string CustomName { get; set; }

        public string Source { get; set; }

        public string Base { get; set; }

        public DateTime DTimeFrom { private get; set; }

        public string TimeFrom => DTimeFrom.ToString("yyyy-MM-dd");

        public Guid UserID { get; set; }

        public string UserName { get; set; }

        public string Department { get; set; }

        public decimal TotalPrice { get; set; }

        public decimal CostPrice { get; set; }

        public decimal ReceivedMoney { get; set; }

        public decimal RemainingMoney { get; set; }

        public decimal Commission { get; set; }

        public string AuditStatus { get; set; }

        public string PayStatus { get; set; }
    }
}