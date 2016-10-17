using System;

namespace SettlementApi.DataAccess.QueryAttribute
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field)]
    public class TableQueryAliasAttribute : Attribute
    {
        public TableQueryAliasAttribute(string tableAliasesName)
        {
            TableAliasesName = tableAliasesName;
        }

        public string TableAliasesName { get; private set; }
    }
}