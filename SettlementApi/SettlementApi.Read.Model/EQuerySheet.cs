using SettlementApi.DataAccess;
using SettlementApi.DataAccess.DefaultPageSetting;
using SettlementApi.DataAccess.QueryAttribute;
using System;

namespace SettlementApi.Read.Model
{
    [DefaultPageIndex(1)]
    [DefaultPageSize(10)]
    [DefaultSortField("DTimeFrom")]
    [DefaultSortType(SortTypeEnum.DESC)]
    public class EQuerySheet : BaseQueryEntity
    {
        [TableQueryAlias("U")]
        [AliasField("Group")]
        [InField]
        public string[] Path { get; set; }

        [TableQueryAlias("S")]
        public Guid? Base { get; set; }

        [TableQueryAlias("S")]
        public Guid? Source { get; set; }

        [TableQueryAlias("U")]
        [AliasField("Name")]
        [LikeField]
        public string ProjectManager { get; set; }

        [TableQueryAlias("S")]
        [RangeField("TimeFrom", RangeEnum.GreaterThan)]
        public DateTime? TimeFrom { get; set; }

        [TableQueryAlias("S")]
        [RangeField("TimeTo", RangeEnum.LessThan)]
        public DateTime? TimeTo { get; set; }

        [LikeField]
        [TableQueryAlias("S")]
        public string CustomName { get; set; }

        [TableQueryAlias("S")]
        public string AuditStatus { get; set; }

        [TableQueryAlias("S")]
        public string PayStatus { get; set; }
    }
}