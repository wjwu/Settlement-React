using System;

namespace SettlementApi.Api.Dtos.Sign
{
    public class UserInfo
    {
        public Guid ID { get; set; }
        public string LoginID { get; set; }
        public Guid Group { get; set; }
        public Guid ParentGroup { get; set; }
        public string Role { get; set; }
        public DateTime? LastLoginTime { get; set; }
        public string LastLoginIP { get; set; }
    }
}