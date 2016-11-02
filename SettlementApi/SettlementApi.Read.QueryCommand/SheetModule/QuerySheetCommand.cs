using System;

namespace SettlementApi.Read.QueryCommand.SheetModule
{
    public class QuerySheetCommand : BasePagingCommand
    {
        public Guid? Group { get; set; }

        public Guid? Base { get; set; }

        public DateTime? TimeFrom{get;set;}

        public DateTime? TimeTo { get; set; }

        public string CustomName { get; set; }

        public string AuditStatus { get; set; }

        public string PayStatus { get; set; }
    }
}