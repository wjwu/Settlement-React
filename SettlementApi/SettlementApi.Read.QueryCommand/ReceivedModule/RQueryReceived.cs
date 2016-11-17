using System;

namespace SettlementApi.Read.QueryCommand.ReceivedModule
{
    public class RQueryReceived
    {
        public Guid ID { get; set; }

        public decimal Money { get; set; }

        public DateTime DTime { private get; set; }

        public string Time => DTime.ToString("yyyy-MM-dd");
    }
}