using System;

namespace SettlementApi.Write.Model
{
    public class Received : BaseModel
    {
        public Guid ID { get; set; }

        public Guid SheetID { get; set; }

        public decimal Money { get; set; }

        public DateTime Time { get; set; }
    }
}