using System;
using System.ComponentModel;

namespace SettlementApi.Common
{
    public static class EnumUtity
    {
        public static T ToEnum<T>(string enumName, T defaultT, bool ignoreCase = true) where T : struct
        {
            if (string.IsNullOrWhiteSpace(enumName))
                return defaultT;

            T result;

            if (!Enum.TryParse(enumName.Trim(), ignoreCase, out result))
                return defaultT;

            if (Enum.IsDefined(typeof(T), result))
                return result;

            return defaultT;
        }

        public static string GetDescription(Type enumType, string enumValue)
        {
            try
            {
                var customAttributes =
                    (DescriptionAttribute[])
                    enumType.GetField(enumValue).GetCustomAttributes(typeof(DescriptionAttribute), false);
                if (customAttributes.Length == 1)
                    return customAttributes[0].Description;
                return enumValue;
            }
            catch
            {
                return "Unknow";
            }
        }
    }
}