using System;
using SettlementApi.CommandBus;
using SettlementApi.Read.Model;
using SettlementApi.Read.QueryCommand;
using SettlementApi.Read.QueryCommand.SheetModule;

namespace SettlementApi.Read.Respository
{
    public class QuerySheet : BaseRRespository, ICommandBus<QuerySheetCommand, BasePagingCommandResult<RQuerySheet>>
    {
        public BasePagingCommandResult<RQuerySheet> Execute(QuerySheetCommand command)
        {
            return QueryPaging<EQuerySheet, RQuerySheet, QuerySheetCommand>("Sheet.Query", command);
        }

        public void Receive(ICommand command)
        {
            throw new NotImplementedException();
        }

        public ICommandResult ReceiveEx(ICommand command)
        {
            if (command.GetType() == typeof(QuerySheetCommand))
                return Execute((QuerySheetCommand) command);
            return null;
        }
    }
}