using System;
using SettlementApi.DataAccess;
using SettlementApi.DataAccess.DefaultPageSetting;

namespace SettlementApi.Read.Model
{
    [DefaultPageIndex(1)]
    [DefaultPageSize(99)]
    [DefaultSortField("Name")]
    [DefaultSortType(SortTypeEnum.ASC)]
    public class EQueryGroup : BaseQueryEntity
    {
        public Guid? ParentID { get; set; }
    }
}