using System;
using SettlementApi.DataAccess;
using SettlementApi.DataAccess.DefaultPageSetting;
using SettlementApi.DataAccess.QueryAttribute;

namespace SettlementApi.Read.Model
{
    [DefaultPageIndex(1)]
    [DefaultPageSize(10)]
    [DefaultSortField("Name")]
    [DefaultSortType(SortTypeEnum.ASC)]
    public class EQueryUser : BaseQueryEntity
    {
        [AliasField("Group")]
        [InField]
        public string[] Path { get; set; }
    }
}