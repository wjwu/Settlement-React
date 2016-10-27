using System.ComponentModel;

namespace SettlementApi.Write.Model.Enums
{
    public enum DictionaryType
    {
        None = -1,
        [Description("基地")] Base = 1,
        [Description("来源")] Source = 2,
        [Description("结算明细")] Cost = 3
    }
}