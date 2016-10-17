using System;

namespace SettlementApi.DataAccess.QueryAttribute
{
    public enum RangeEnum
    {
        LessThan,
        GreaterThan
    }

    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field)]
    public class RangeFieldAttribute : Attribute
    {
        public RangeFieldAttribute(string field, RangeEnum range)
        {
            Field = field;
            Range = range;
        }

        public string Field { get; private set; }
        public RangeEnum Range { get; private set; }
    }
}