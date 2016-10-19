using System;

namespace SettlementApi.Read.QueryCommand.UserModule
{
    public class QueryUserCommand : BasePagingCommand
    {
        public Guid? Group { get; set; }
    }
}