using System;
using SettlementApi.CommandBus;
using SettlementApi.Common;
using SettlementApi.Write.Model.Enums;

namespace SettlementApi.Write.BusCommand.UserModule
{
    public class LoginCommandResult : ICommandResult
    {
        public Guid ID { get; set; }

        public string LoginID { get; set; }

        public Guid Group { get; set; }

        public Guid ParentGroup { get; set; }

        public string Role { get; set; }
        //private string _role { get; set; }
        //public string Role {
        //    get {
        //        return EnumUtity.GetDescription(typeof(RoleType), _role);
        //    } set {
        //        _role = value;
        //    } }

        public DateTime? LastLoginTime { get; set; }

        public string LastLoginIP { get; set; }
    }
}