﻿using System.Text;

namespace SettlementApi.Write.BusinessLogic.Utility
{
    public class IPConverter
    {
        public static string IntToIp(long ipInt)
        {
            var sb = new StringBuilder();

            sb.Append((ipInt >> 24) & 0xFF).Append(".");

            sb.Append((ipInt >> 16) & 0xFF).Append(".");

            sb.Append((ipInt >> 8) & 0xFF).Append(".");

            sb.Append(ipInt & 0xFF);

            return sb.ToString();
        }

        public static long IpToInt(string ip)
        {
            char[] separator = {'.'};

            string[] items = ip.Split(separator);

            return long.Parse(items[0]) << 24
                   | long.Parse(items[1]) << 16
                   | long.Parse(items[2]) << 8
                   | long.Parse(items[3]);
        }
    }
}