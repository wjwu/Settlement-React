using System.ComponentModel;

namespace SettlementApi.Write.Model.Enums
{
    public enum RoleType
    {
        None = -1,
        [Description("系统管理员")]
        Admin = 1,
        [Description("部门主管")]
        DeptManager = 2,
        [Description("财务")]
        Financial = 3,
        [Description("普通员工")]
        Employee = 4,
    }
}
