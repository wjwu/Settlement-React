using System;

namespace SettlementApi.DataAccess.QueryAttribute
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field)]
    public class ExecuteIgnoreAttribute : Attribute
    {
    }
}