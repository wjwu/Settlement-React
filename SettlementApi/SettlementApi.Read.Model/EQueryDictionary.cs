using SettlementApi.DataAccess;
using SettlementApi.DataAccess.DefaultPageSetting;

namespace SettlementApi.Read.Model
{
    [DefaultPageIndex(1)]
    [DefaultPageSize(10)]
    [DefaultSortField("Name")]
    [DefaultSortType(SortTypeEnum.ASC)]
    public class EQueryDictionary: BaseQueryEntity
    {
        public string Type { get; set; }

        public bool? Enabled { get; set; }
    }
}