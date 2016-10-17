using System;

namespace SettlementApi.DataAccess.DefaultPageSetting
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Field, Inherited = false)]
    public class DefaultPageIndexAttribute : Attribute
    {
        public DefaultPageIndexAttribute(int pageIndex)
        {
            if (pageIndex <= 0)
            {
                throw new ArgumentException("Page index can not less than zero.");
            }
            PageIndex = pageIndex;
        }

        public int PageIndex { get; private set; }
    }
}