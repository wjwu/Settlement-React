﻿using System.ComponentModel;

namespace SettlementApi.Write.Model.Enums
{
    public enum RoleType
    {
        None = -1,
        [Description("系统管理员")]
        Admin = 1,
        [Description("部门管理员")]
        DeptManager = 2,
        [Description("员工")]
        Employee = 3,
    }
}
