using System;
using SettlementApi.CommandBus;
using SettlementApi.Read.Model;
using SettlementApi.Read.QueryCommand;
using SettlementApi.Read.QueryCommand.SheetModule;
using SettlementApi.Read.QueryCommand.CostModule;
using SettlementApi.Read.QueryCommand.ReceivedModule;

namespace SettlementApi.Read.Respository
{
    public class QuerySheet : BaseRRespository, 
        ICommandBus<QuerySheetCommand, BasePagingCommandResult<RQuerySheet>>,
        ICommandBus<GetByIDCommand,GetSheetCommandResult>
    {
        public GetSheetCommandResult Execute(GetByIDCommand command)
        {
            var result = GetByID<GetSheetCommandResult>("Sheet.Query.GetByID", new
            {
                command.ID
            });
            if (result!=null)
            {
                result.Costs = new QueryCost().Execute(new QueryCostCommand { SheetID = result.ID });
                result.Receiveds = new QueryReceived().Execute(new QueryReceivedCommand { SheetID = result.ID });
            }
            return result;
        }

        public BasePagingCommandResult<RQuerySheet> Execute(QuerySheetCommand command)
        {
            if (!string.IsNullOrEmpty(command.Groups))
            {
                command.Path = command.Groups.Split(',');
            }
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