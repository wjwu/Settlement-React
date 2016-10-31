namespace SettlementApi.Read.QueryCommand.DictionaryModule
{
    public class QueryDictionaryCommand: BasePagingCommand
    {
        public string Type { get; set; }
        public bool? Enabled { get; set; }
    }
}