using System;
using System.Collections.Generic;
using SettlementApi.CommandBus;

namespace SettlementApi.Write.BusCommand.SheetModule
{
    public class CreateSheetCommand : ICommand
    {
        public string CustomName { get; set; }

        public string Contacts { get; set; }

        public string Phone { get; set; }

        public string QQ { get; set; }

        public string WeiXin { get; set; }

        public string Address { get; set; }

        public DateTime TimeFrom { get; set; }

        public DateTime TimeTo { get; set; }

        public Guid Base { get; set; }

        public int People { get; set; }

        public Guid Source { get; set; }

        public decimal TotalPrice { get; set; }

        public string Remark { get; set; }

        public bool Submit { get; set; }

        public List<CostEntity> Costs { get; set; }

        public List<ReceivedEntity> Receiveds { get; set; }
    }
}