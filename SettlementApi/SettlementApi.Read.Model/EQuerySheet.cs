using SettlementApi.DataAccess;
using SettlementApi.DataAccess.DefaultPageSetting;

namespace SettlementApi.Read.Model
{
    [DefaultPageIndex(1)]
    [DefaultPageSize(10)]
    [DefaultSortField("DTimeFrom")]
    [DefaultSortType(SortTypeEnum.DESC)]
    public class EQuerySheet : BaseQueryEntity
    {
    }
}