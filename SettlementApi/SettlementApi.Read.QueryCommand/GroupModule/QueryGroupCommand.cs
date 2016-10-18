using System;

namespace SettlementApi.Read.QueryCommand.GroupModule
{
    public class QueryGroupCommand : BasePagingCommand
    {
        public Guid? ParentID { get; set; }
    }
}