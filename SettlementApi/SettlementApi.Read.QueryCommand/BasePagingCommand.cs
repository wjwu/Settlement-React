using SettlementApi.CommandBus;

namespace SettlementApi.Read.QueryCommand
{
    public class BasePagingCommand : ICommand
    {
        public int? PageIndex { get; set; }

        public int? PageSize { get; set; }

        public string SortField { get; set; }

        public string SortType { get; set; }
    }
}