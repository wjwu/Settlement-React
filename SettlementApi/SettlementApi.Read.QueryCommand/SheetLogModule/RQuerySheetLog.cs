using System;

namespace SettlementApi.Read.QueryCommand.SheetLogModule
{
    public class RQuerySheetLog
    {
        public string Operator { get; set; }

        public string Text { get; set; }

        public DateTime DCreateTime { private get; set; }

        public string CreateTime => DCreateTime.ToString("yyyy-MM-dd HH:mm:ss");
    }
}