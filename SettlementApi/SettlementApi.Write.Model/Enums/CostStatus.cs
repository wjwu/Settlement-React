using System.ComponentModel;

namespace SettlementApi.Write.Model.Enums
{
    public enum CostStatus
    {
        None = -1,
        [Description("已付款")] Paid = 1,
        [Description("未付款")] Unpaid = 2
    }
}