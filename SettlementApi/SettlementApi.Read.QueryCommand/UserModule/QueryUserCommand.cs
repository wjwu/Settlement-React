namespace SettlementApi.Read.QueryCommand.UserModule
{
    public class QueryUserCommand : BasePagingCommand
    {
        public string Groups { get; set; }

        public string[] Path { get; set; }
    }
}