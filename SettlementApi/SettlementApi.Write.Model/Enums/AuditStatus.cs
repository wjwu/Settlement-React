using System.ComponentModel;

namespace SettlementApi.Write.Model.Enums
{
    public enum AuditStatus
    {
        None = -1,
        [Description("未提交")] UnSubmit = 1,
        [Description("审核中")] Auditing = 2,
        [Description("通过")] Pass = 3,
        [Description("未通过")] Fail = 4
    }
}