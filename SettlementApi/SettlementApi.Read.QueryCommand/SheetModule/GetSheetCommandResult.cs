using SettlementApi.CommandBus;
using System;

namespace SettlementApi.Read.QueryCommand.SheetModule
{
    public class GetSheetCommandResult: ICommandResult
    {
        public Guid ID { get; set; }

        public string CustomName { get; set; }

        public string Contacts { get; set; }

        public string Phone { get; set; }

        public string QQ { get; set; }

        public string WeiXin { get; set; }

        public string Address { get; set; }

        public DateTime DTimeFrom { private get; set; }

        public string TimeFrom => DTimeFrom.ToString("yyyy-MM-dd");

        public DateTime DTimeTo { private get; set; }

        public string TimeTo => DTimeTo.ToString("yyyy-MM-dd");

        public Guid Base { get; set; }

        public int People { get; set; }

        public Guid Source { get; set; }

        public decimal TotalPrice { get; set; }

        public decimal UnitPrice { get; set; }

        public decimal CostPrice { get; set; }

        public string Remark { get; set; }
    }
}
