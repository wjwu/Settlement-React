using System;
using SettlementApi.DataAccess;
using SettlementApi.DataAccess.DefaultPageSetting;

namespace SettlementApi.Read.Model
{
    [DefaultPageIndex(1)]
    [DefaultPageSize(10)]
    [DefaultSortField("Name")]
    [DefaultSortType(SortTypeEnum.ASC)]
    public class EQueryUser : BaseQueryEntity
    {
        public Guid? Group { get; set; }
    }
}