using System;

namespace SettlementApi.Write.Model
{
    public class Group : BaseModel
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public Guid ParentID { get; set; }
    }
}