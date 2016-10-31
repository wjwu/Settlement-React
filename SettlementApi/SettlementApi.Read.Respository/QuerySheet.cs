using System;
using SettlementApi.CommandBus;
using SettlementApi.Read.Model;
using SettlementApi.Read.QueryCommand;
using SettlementApi.Read.QueryCommand.SheetModule;

namespace SettlementApi.Read.Respository
{
    public class QuerySheet : BaseRRespository, ICommandBus<QuerySheetCommand, BasePagingCommandResult<RQuerySheet>>,
        ICommandBus<GetByIDCommand,GetSheetCommandResult>
    {
        public GetSheetCommandResult Execute(GetByIDCommand command)
        {
            var result = GetByID<GetSheetCommandResult>("Sheet.Query.GetByID", new
            {
                command.ID
            });
            return result;
        }

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
            if (command.GetType() == typeof(GetByIDCommand))
                return Execute((GetByIDCommand)command);
            return null;
        }
    }
}