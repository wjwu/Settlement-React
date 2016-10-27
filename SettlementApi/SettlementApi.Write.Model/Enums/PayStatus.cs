using System.ComponentModel;

namespace SettlementApi.Write.Model.Enums
{
    public enum PayStatus
    {
        None = -1,
        [Description("已付清")] Paid = 1,
        [Description("未付清")] Unpaid = 2
    }
}