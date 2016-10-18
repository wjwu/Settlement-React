using System.Collections.Generic;
using SettlementApi.CommandBus;

namespace SettlementApi.Read.QueryCommand
{
    public class BasePagingCommandResult<T> : ICommandResult where T : class
    {
        public int? PageIndex { get; set; }

        public int? PageSize { get; set; }

        public string SortField { get; set; }

        public string SortType { get; set; }

        public int TotalCount { get; set; }

        public List<T> List { get; set; }
    }
}