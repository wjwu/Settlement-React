using System;

namespace SettlementApi.Common
{
    public static class EnumUtity
    {
        public static T ToEnum<T>(string enumName, T defaultT, bool ignoreCase = true) where T : struct
        {
            if (string.IsNullOrWhiteSpace(enumName))
            {
                return defaultT;
            }

            T result;

            if (!Enum.TryParse(enumName.Trim(), ignoreCase, out result))
            {
                return defaultT;
            }

            if (Enum.IsDefined(typeof (T), result))
            {
                return result;
            }

            return defaultT;
        }
    }
}