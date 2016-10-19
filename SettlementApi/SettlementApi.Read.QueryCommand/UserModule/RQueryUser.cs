using System;

namespace SettlementApi.Read.QueryCommand.UserModule
{
    public class RQueryUser
    {
        public Guid ID { get; set; }
        public string LoginID { get; set; }
        public string Phone { get; set; }
        public string Name { get; set; }
        public Guid Group { get; set; }
        public bool Enabled { get; set; }
        public DateTime CreateTime { get; set; }
        public string LastLoginIP { get; set; }
        public DateTime LastLoginTime { get; set; }
    }
}