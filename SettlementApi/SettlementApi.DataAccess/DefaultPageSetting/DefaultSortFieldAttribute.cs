using System;

namespace SettlementApi.DataAccess.DefaultPageSetting
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Field, Inherited = false)]
    public class DefaultSortFieldAttribute : Attribute
    {
        public DefaultSortFieldAttribute(string sortField)
        {
            SortField = sortField;
        }

        public string SortField { get; private set; }
    }
}