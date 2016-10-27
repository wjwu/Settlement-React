using System;

namespace SettlementApi.Write.Model
{
    public class ReceivedDetail : BaseModel
    {
        public Guid ID { get; set; }

        public Guid SheetID { get; set; }

        public decimal Money { get; set; }

        public DateTime Time { get; set; }
    }
}