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
        public string Role { get; set; }
        public bool Enabled { get; set; }
        public DateTime DCreateTime { private get; set; }
        public string CreateTime => DCreateTime.ToString("yyyy-MM-dd HH:mm:ss");
        public string LastLoginIP { get; set; }
        public DateTime DLastLoginTime { private get; set; }
        public string LastLoginTime => DLastLoginTime.ToString("yyyy-MM-dd HH:mm:ss");
    }
}