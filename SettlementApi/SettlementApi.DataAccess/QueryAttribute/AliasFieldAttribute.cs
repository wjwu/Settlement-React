using System;

namespace SettlementApi.DataAccess.QueryAttribute
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field)]
    public class AliasFieldAttribute : Attribute
    {
        public AliasFieldAttribute(string sqlFieldName)
        {
            if (string.IsNullOrWhiteSpace(sqlFieldName))
            {
                throw new ArgumentNullException(nameof(sqlFieldName));
            }
            SqlFieldName = sqlFieldName;
        }

        public string SqlFieldName { get; private set; }
    }
}