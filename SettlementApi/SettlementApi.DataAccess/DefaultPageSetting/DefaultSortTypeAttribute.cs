using System;

namespace SettlementApi.DataAccess.DefaultPageSetting
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Field, Inherited = false)]
    public class DefaultSortTypeAttribute : Attribute
    {
        public DefaultSortTypeAttribute(SortTypeEnum sortType)
        {
            SortType = sortType;
        }

        public SortTypeEnum SortType { get; private set; }
    }
}