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

        public decimal Total { get; set; }

        public decimal Cost { get; set; }

        public decimal Received { get; set; }

        public decimal Remaining { get; set; }

        public decimal Commission { get; set; }

        public decimal Tax { get; set; }

        public decimal TaxRate { get; set; }

        public decimal Achievement { get; set; }

        public string AuditStatus { get; set; }

        public string PayStatus { get; set; }
    }
}