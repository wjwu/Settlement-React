using System;
using SettlementApi.Common;
using SettlementApi.Write.Model.Enums;

namespace SettlementApi.Read.QueryCommand.SheetModule
{
    public class RQuerySheet
    {
        private string _auditStatus;

        private string _payStatus;

        public Guid ID { get; set; }

        public string CustomName { get; set; }

        public string Base { get; set; }

        public DateTime DTimeFrom { private get; set; }

        public string TimeFrom => DTimeFrom.ToString("yyyy-MM-dd");

        public string ProjectManager { get; set; }

        public decimal TotalPrice { get; set; }

        public decimal CostPrice { get; set; }

        public decimal ReceivedMoney { get; set; }

        public decimal RemainingMoney { get; set; }

        public string AuditStatus
        {
            get { return EnumUtity.GetDescription(typeof(AuditStatus), _auditStatus); }
            set { _auditStatus = value; }
        }

        public string PayStatus
        {
            get { return EnumUtity.GetDescription(typeof(PayStatus), _payStatus); }
            set { _payStatus = value; }
        }
    }
}