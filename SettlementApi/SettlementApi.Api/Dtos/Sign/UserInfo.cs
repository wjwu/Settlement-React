using System;
using System.Collections.Generic;

namespace SettlementApi.Api.Dtos.Sign
{
    public class UserInfo
    {
        public Guid ID { get; set; }
        public string LoginID { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public Guid Group { get; set; }
        public string GroupName { get; set; }
        public Guid ParentGroup { get; set; }
        public List<string>Path { get; set; }
        public string Role { get; set; }
        public string RoleName { get; set; }
        public string LastLoginTime { get; set; }
        public string LastLoginIP { get; set; }
    }
}