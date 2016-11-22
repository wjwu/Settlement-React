using System;

namespace SettlementApi.Write.Model
{
    public class SheetLog
    {
        public Guid ID { get; set; }

        public Guid SheetID { get; set; }

        public Guid OperatorID { get; set; }

        public string Text { get; set; }

        public DateTime CreateTime { get; set; }

        public bool Deleted { get; set; }
    }
}