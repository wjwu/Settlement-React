using System;
using SettlementApi.CommandBus;

namespace SettlementApi.Read.QueryCommand.SheetModule
{
    public class QuerySheetNoPagingCommand : ICommand
    {
        public string Groups { get; set; }

        public string[] Path { get; set; }

        public Guid? Base { get; set; }

        public Guid? Source { get; set; }

        public DateTime? TimeFrom { get; set; }

        public DateTime? TimeTo { get; set; }

        public string CustomName { get; set; }

        public string ProjectManager { get; set; }

        public string AuditStatus { get; set; }

        public string PayStatus { get; set; }
    }
}