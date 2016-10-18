using System;

namespace SettlementApi.Read.QueryCommand.GroupModule
{
    public class RQueryGroup
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public Guid ParentID { get; set; }
    }
}