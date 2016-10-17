using System;

namespace SettlementApi.DataAccess.DefaultPageSetting
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Field, Inherited = false)]
    public class DefaultPageSizeAttribute : Attribute
    {
        public DefaultPageSizeAttribute(int pageSize)
        {
            if (pageSize <= 0)
            {
                throw new ArgumentException("Page size can not less than zero.");
            }
            PageSize = pageSize;
        }

        public int PageSize { get; private set; }
    }
}