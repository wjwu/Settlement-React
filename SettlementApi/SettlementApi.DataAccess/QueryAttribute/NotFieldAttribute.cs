using System;

namespace SettlementApi.DataAccess.QueryAttribute
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field)]
    public class NotFieldAttribute : Attribute
    {
    }
}