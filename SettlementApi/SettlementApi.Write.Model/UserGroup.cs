using System;

namespace SettlementApi.Write.Model
{
    public class UserGroup
    {
        public Guid ID { get; set; }
        public Guid UserID { get; set; }
        public Guid GroupID { get; set; }
        public bool Deleted { get; set; }
    }
}