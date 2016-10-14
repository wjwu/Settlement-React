using System;

namespace TT.Admin.WebApi.Dtos.Sign
{
    public class UserInfo
    {
        public Guid ID { get; set; }
        public string LoginID { get; set; }
        public DateTime? LastLoginTime { get; set; }
        public string LastLoginIP { get; set; }
    }
}